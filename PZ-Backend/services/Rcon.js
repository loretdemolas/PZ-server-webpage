import net from 'net';
import { EventEmitter } from 'events';

//Official RCON Protocol Specification: https://developer.valvesoftware.com/wiki/Source_RCON_Protocol

class Rcon extends EventEmitter {
  #socket;
  #authenticated = false;
  #reconnectTimeout;

  constructor(options) {
    super();
    this.host = options.host;
    this.port = options.port;
    this.password = options.password;
    this.timeout = options.timeout || 5000; // default timeout of 5 seconds

    this.#socket = new net.Socket();

    this.#socket.on('error', (err) => {
      console.error(`RCON error: ${err}`);
      this.emit('error', err);
    });

    this.#socket.on('close', () => {
      this.#authenticated = false;
      this.emit('disconnected');
      if (this.#reconnectTimeout) return; // don't start reconnecting if already waiting to reconnect
      this.#reconnectTimeout = setTimeout(() => {
        this.connect()
          .then(() => {
            this.emit('reconnected');
          })
          .catch((err) => {
            this.emit('reconnectFailed', err);
          })
          .finally(() => {
            this.#reconnectTimeout = null;
          });
      }, 5000); // attempt to reconnect every 5 seconds
    });

    this.connect(); // automatically connect on instantiation
  }

  #sendPacket = (packet) => {
    return new Promise((resolve, reject) => {
      this.#socket.write(packet);

      const onData = (data) => {
        const packetSize = data.readInt32LE(0);
        const responseType = data.readInt32LE(4);
        const response = data.toString('utf8', 8, packetSize + 2);

        if (responseType === 2) {
          this.#authenticated = true;
          this.#socket.off('data', onData);
          resolve();
        } else if (responseType === -1) {
          this.#socket.off('data', onData);
          reject(new Error('RCON authentication failed'));
        } else {
          this.#socket.off('data', onData);
          reject(new Error(`Unexpected RCON response type: ${responseType}`));
        }
      };

      this.#socket.on('data', onData);

      setTimeout(() => {
        this.#socket.off('data', onData);
        reject(new Error(`RCON request timed out after ${this.timeout}ms`));
      }, this.timeout);
    });
  }

  connect = async () => {
    try {
      await new Promise((resolve, reject) => {
        this.#socket.connect(this.port, this.host, () => {
          console.log(`Connected to RCON server at ${this.host}:${this.port}`);
          resolve();
        });
        this.#socket.once('error', (err) => { // Use `once` instead of `on` to prevent multiple error handlers
          reject(err);
        });
      });
      await this.#authenticate();
      console.log('Successfully authenticated with RCON server');
    } catch (err) {
      console.error(`Error connecting to RCON server: ${err}`);
      throw err;
    }
  }

  #authenticate = async () => {
    const packet = Buffer.alloc(14 + this.password.length, 0);
    packet.writeInt32LE(10 + this.password.length, 0);
    packet.writeInt32LE(0, 4);
    packet.write(this.password, 8, 'utf8');
    packet.writeInt8(0, 8 + this.password.length);
    packet.writeInt8(0, 9 + this.password.length);

    await this.#sendPacket(packet);
  }

  execute = async (command) => {
    if (!this.#authenticated) {
      throw new Error('Not authenticated');
    }
  
    const packet = Buffer.alloc(10 + command.length, 0);
    packet.writeInt32LE(10 + command.length, 0); // Use `10 + command.length` instead of `6 + command.length`
    packet.writeInt32LE(0, 4);
    packet.writeInt32LE(0, 8); // Set the request ID to 0
    packet.write(command, 12, 'utf8'); // Write the command starting at offset 12
    packet.writeInt8(0, 12 + command.length);
    packet.writeInt8(0, 13 + command.length);
  
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        this.#socket.off('data', onData);
        reject(new Error('RCON command timed out'));
      }, this.timeout); // Use `this.timeout` instead of `timeout`
  
      const onData = (data) => {
        clearTimeout(timeoutId);
        const packetSize = data.readInt32LE(0);
        const responseType = data.readInt32LE(4);
        const response = data.toString('utf8', 8, packetSize + 2);
  
        if (responseType !== 0) {
          reject(new Error(`RCON command failed: ${response}`));
        } else {
          resolve(response);
        }
      };
  
      this.#socket.on('data', onData);
      this.#socket.write(packet, () => {
        this.#socket.removeListener('data', onData);
      });
    });
  }
  disconnect = () => {
    this.#socket.destroy();
    this.#authenticated = false;
    clearTimeout(this.#reconnectTimeout);
    this.#reconnectTimeout = null;
    this.emit('disconnected');
  }
  
}

export default Rcon;