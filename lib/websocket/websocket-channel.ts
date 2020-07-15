import { Logger } from '@nestjs/common';

class WebSocketChannel<T> {
  private readonly clients: { [key: string]: T } = {};

  get(id: string): T {
    return this.clients[id];
  }

  getAll(): { id: string; data: T }[] {
    return Object.keys(this.clients).map(id => {
      return { id, data: this.clients[id] };
    });
  }

  push(id: string, data: T) {
    this.clients[id] = data;
  }

  pop(id: string): boolean {
    const isPresent = !!this.clients[id];
    delete this.clients[id];
    return isPresent;
  }
}

export class WebSocketChannels<T> {
  private readonly channels: { [key: string]: WebSocketChannel<T> } = {};
  private readonly connectedClients: { [key: string]: string } = {};
  private readonly logger = new Logger('WebSocketChannels');

  private create(id: string): WebSocketChannel<T> {
    return (this.channels[id] = new WebSocketChannel());
  }

  get(id: string): WebSocketChannel<T> {
    return this.channels[id];
  }

  push(id: string, clientId: string, data: T) {
    let channel: WebSocketChannel<T> = this.get(id);
    if (!channel) {
      channel = this.create(id);
    }
    channel.push(clientId, data);
    this.connectedClients[clientId] = id;
  }

  pop(clientId: string): boolean {
    const channelId = this.connectedClients[clientId];
    if (!this.get(channelId).pop(clientId)) {
      this.logger.warn(
        'Tentativa de retirar um Cliente que não estava no canal.',
      );
      return false;
    }
    delete this.connectedClients[clientId];
    return true;
  }
}
