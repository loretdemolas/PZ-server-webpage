import net from 'net';

const TIMEOUT_MS = 5000;



class Rcon {
    #authenticated = false;

    static PACKET_TYPE = {
        AUTH: '3',
        COMMAND: '2',
        RESPONSE: '0'
    };
    constructor(ip, port, password) {
        if (typeof ip !== 'string' || ip.trim().length === 0) {
            throw new Error('Invalid IP address');
        }
        if (typeof port !== 'number' || port < 0 || port > 65535) {
            throw new Error('Invalid port');
        }
        if (typeof password !== 'string' || password.trim().length === 0) {
            throw new Error('Invalid password');
        }

        this.ip = ip;
        this.port = port;
        this.password = password;
        this.socket = new net.Socket();
    }

    /**
     * Connect to the RCON server.
     * @returns {Promise<void>}
     * @throws {Error} If an error occurs while connecting.
     */
    async connect() {
        try {
            await new Promise((resolve, reject) => {
            this.socket.connect(this.port, this.ip, () => {
                resolve();
            });

            this.socket.on('error', (error) => {
                reject(new Error(`Error occurred while connecting: ${error}`));
            });
            });
            console.log('Connected to server');
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    /**
     * Authenticates with the RCON server using the provided password.
     * @returns {Promise<void>} A promise that resolves if the authentication is successful, or rejects with an error if it fails.
     * @throws {Error} If not connected to the RCON server or if authentication fails.
     */
    async authenticate() {
        // Build an authentication packet using the provided password
        const packet = this.buildPacket(Rcon.PACKET_TYPE.AUTH, this.password);

        // Send the authentication packet to the RCON server and wait for a response
        const response = await this.sendPacket(packet);

        // Parse the response and check if authentication was successful
        const responseId = response.readInt32LE(4);
        if (responseId === -1) {
            console.log('Authentication failed');
                throw new Error('Authentication failed');
        } else {
            console.log('Authenticated successfully');
            this.#authenticated = true;

        }
    }

    /**
     * Sends a command to the server and returns the server's response.
     * @param {string} command - The command to send to the server.
     * @returns {Promise<string>} - A Promise that resolves to the server's response as a string.
     * @throws {Error} - If the client is not authenticated.
     * @throws {Error} - If an error occurs while sending the packet or receiving the response.
     * @throws {Error} - If the request times out.
     */
    async sendCommand(command) {
        if (!this.#authenticated) {
        throw new Error('Not authenticated');
        }
        const packet = this.buildPacket(Rcon.PACKET_TYPE.COMMAND, command);
        const response = await this.sendPacket(packet);
        return this.readResponse(response)
        
    }
  
  
    /**
     * Sends a packet to the RCON server and returns the response.
     *
     * @param {Buffer} packet - The packet to send.
     * @returns {Promise<Buffer>} - A promise that resolves with the response from the server.
     * @throws {Error} - If the request times out or if there is an error while sending the packet.
     */
    async sendPacket(packet) {
        console.log(packet)
        return new Promise((resolve, reject) => {
        // Send the packet to the server.
        this.socket.write(packet);
    
        // When we receive data from the server, resolve the promise with the response.
        this.socket.once('data', (data) => {
            resolve(data);
            console.log(data)
        });
    
        // If there is an error while sending the packet, reject the promise with the error.
        this.socket.once('error', (error) => {
            reject(error);
            console.log(error)
        });
    
        // If the request takes longer than the TIMEOUT_MS constant to complete, reject the promise with a timeout error.
        setTimeout(() => {
            reject(new Error('Request timed out'));
        }, TIMEOUT_MS);
        });
    }
  

    /**
     * Builds a packet to send to the server.
     * @param {number} type - The type of packet to send.
     * @param {string} body - The body of the packet to send.
     * @returns {Buffer} The packet to send.
     */
    buildPacket(type, body) {
        // Check that the body is valid
        if (typeof body !== 'string') {
            throw new Error('body must be a string');
        }
        // Check that the type is valid.
        if (!Object.values(Rcon.PACKET_TYPE).includes(type)) {
            throw new Error(`Invalid packet type: ${type}`);
        }
        // Check that the body is not null or undefined.
        if (body == null) {
            throw new Error('Packet body is null or undefined');
        }
        
        // Generate a random packet ID.
        const id = Math.floor(Math.random() * 0x7fffffff);
        // Calculate the size of the packet.
        const size = Buffer.byteLength(body) + 14;
        // Create a new buffer for the packet.
        const packet = Buffer.alloc(size);
        
        // Write the size of the packet to the first 4 bytes.
        packet.writeInt32LE(size - 4, 0);
        // Write the ID of the packet to the next 4 bytes.
        packet.writeInt32LE(id, 4);
        // Write the type of the packet to the next 4 bytes.
        packet.writeInt32LE(type, 8,);
        // Write the body of the packet to the buffer starting at byte 12.
        packet.write(body, 12, size-2, 'ascii');
        // Write a null byte to the end of the packet.
        packet.writeInt8(0, size - 2);
        // Return the packet.
        return packet;
    }
    readResponse(response) {
        console.log(response)
        const message ={
        size: response.readInt32LE(0),
		id:   response.readInt32LE(4),
		type: response.readInt32LE(8),
		body: response.toString("ascii", 12, response.length - 2)
        };

        console.log(message)
        return message;
    }

    /**
     * Disconnects the socket from the RCON server.
     * 
     * @returns {Promise<void>} - A Promise that resolves when the socket has been closed.
     * @throws {Error} - Throws an error if an error occurs while disconnecting.
     */
    async disconnect() {
        try {
        this.socket.end();
        } catch (error) {
        console.log('Error occurred while disconnecting:', error);
        throw error;
        }
    }
}  

export default Rcon;