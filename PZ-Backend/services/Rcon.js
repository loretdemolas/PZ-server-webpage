import net from 'net';
import { EventEmitter } from 'events';

//Official RCON Protocol Specification: https://developer.valvesoftware.com/wiki/Source_RCON_Protocol

class Rcon extends EventEmitter {
  #socket;
  #authenticated = false;
  #callbacks = {};
  #packetId = 0;

  constructor(host, port, password) {
    super();
    this.host = host;
    this.port = port;
    this.password = password;
  }

  connect() {
    this.#socket = new net.Socket();
    this.#socket.connect(this.port, this.host, () => {
      console.log('Connected to RCON server');
    });
    this.#socket.on('data', this.#handleData.bind(this));
    this.#socket.on('error', this.#handleError.bind(this));
  }

  send(data, callback) {
    if (!this.#authenticated && data.type !== 3) {
      console.error('Cannot send non-authentication request before authenticating');
      return;
    }

    if (callback) {
      this.#packetId++;
      this.#callbacks[this.#packetId] = callback;
    }

    const size = Buffer.byteLength(data.body) + 14;
    const buffer = Buffer.alloc(size);
    buffer.writeInt32LE(size - 4, 0);
    buffer.writeInt32LE(this.#packetId, 4);
    buffer.writeInt32LE(data.type, 8);
    buffer.write(data.body, 12, size -2);
    buffer.writeInt16LE(0, size - 2);

    this.#socket.write(buffer);
  }

  #handleData(data) {
    console.log("data:",data);
    console.log(data.length)
    let offset = 0;
    let id, type, body;
  
    if (data.length - 4 > 10) {
      while (offset <= data.length - 4) {
        console.log(offset)
        const size = data.readInt32LE(offset);
        if (offset + size > data.length){
          console.error('Packet size exceeds buffer length');
          break;
        }
        id = data.readInt32LE(offset + 4);
        type = data.readInt32LE(offset + 8);
        body = size >= 10 ? data.toString('ascii', offset + 12, offset + size - 2) : '';
  
        if (id !== 0 && this.#callbacks[id]) {
          this.#callbacks[id](body);
          delete this.#callbacks[id];
        } else {
          this.#handleResponse({ id, type, body });
        }
  
        offset += size;
      }
    } else {
      const size = data.readInt32LE(offset);
      if (offset + size > data.length){
        console.error('Packet size exceeds buffer length');
        return;
      }
      id = data.readInt32LE(4);
      type = data.readInt32LE(8);
      body = size >= 10 ? data.toString('ascii', 12, size - 2) : '';
  
      if (id !== 0 && this.#callbacks[id]) {
        this.#callbacks[id](body);
        delete this.#callbacks[id];
      } else {
        this.#handleResponse({ id, type, body });
      }
    }
  }
  
  
  

  #handleResponse(response) {
    if (response.type === 0) {
      console.log(`Response: ${response.body}`);
    } else if (response.type === 2) {
      if (response.body === '') {
        this.#authenticated = true;
        console.log('Authenticated with RCON server');
      } else {
        console.error(`Authentication failed: ${response.body}`);
      }
    }
  }

  #handleError(error) {
    console.error(`Socket error: ${error.message}`);
  }

  authenticate() {
    this.send({
      type: 3,
      body: this.password
    });
  }

  executeCommand(command, callback) {
    this.send({
      type: 2,
      body: command
    }, callback);
  }
}


export default Rcon;
