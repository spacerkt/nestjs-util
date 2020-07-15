"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketChannels = void 0;
const common_1 = require("@nestjs/common");
class WebSocketChannel {
    constructor() {
        this.clients = {};
    }
    get(id) {
        return this.clients[id];
    }
    getAll() {
        return Object.keys(this.clients).map(id => {
            return { id, data: this.clients[id] };
        });
    }
    push(id, data) {
        this.clients[id] = data;
    }
    pop(id) {
        const isPresent = !!this.clients[id];
        delete this.clients[id];
        return isPresent;
    }
}
class WebSocketChannels {
    constructor() {
        this.channels = {};
        this.connectedClients = {};
        this.logger = new common_1.Logger('WebSocketChannels');
    }
    create(id) {
        return (this.channels[id] = new WebSocketChannel());
    }
    get(id) {
        return this.channels[id];
    }
    push(id, clientId, data) {
        let channel = this.get(id);
        if (!channel) {
            channel = this.create(id);
        }
        channel.push(clientId, data);
        this.connectedClients[clientId] = id;
    }
    pop(clientId) {
        const channelId = this.connectedClients[clientId];
        if (!this.get(channelId).pop(clientId)) {
            this.logger.warn('Tentativa de retirar um Cliente que não estava no canal.');
            return false;
        }
        delete this.connectedClients[clientId];
        return true;
    }
}
exports.WebSocketChannels = WebSocketChannels;
