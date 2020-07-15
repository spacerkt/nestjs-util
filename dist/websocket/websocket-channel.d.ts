declare class WebSocketChannel<T> {
    private readonly clients;
    get(id: string): T;
    getAll(): {
        id: string;
        data: T;
    }[];
    push(id: string, data: T): void;
    pop(id: string): boolean;
}
export declare class WebSocketChannels<T> {
    private readonly channels;
    private readonly connectedClients;
    private readonly logger;
    private create;
    get(id: string): WebSocketChannel<T>;
    push(id: string, clientId: string, data: T): void;
    pop(clientId: string): boolean;
}
export {};
