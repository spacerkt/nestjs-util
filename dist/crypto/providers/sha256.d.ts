import { ConfigService } from '@nestjs/config';
export declare class Sha256 {
    private readonly configService;
    private readonly resizedIV;
    constructor(configService: ConfigService);
    encrypt(phrase: string): string;
    decrypt(phrase: string): string;
}
