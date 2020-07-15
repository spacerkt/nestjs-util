"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sha256 = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const crypto_constants_1 = require("../crypto.constants");
let Sha256 = class Sha256 {
    constructor(configService) {
        this.configService = configService;
        this.resizedIV = Buffer.allocUnsafe(crypto_constants_1.bufferSha256Length);
        const iv = crypto_1.createHash('sha256')
            .update(this.configService.get('SHA256_IV') || 'constante-api')
            .digest();
        iv.copy(this.resizedIV);
    }
    encrypt(phrase) {
        const cipher = crypto_1.createCipheriv('aes256', this.configService.get('APP_KEY'), this.resizedIV);
        return cipher.update(phrase, 'binary', 'hex') + cipher.final('hex');
    }
    decrypt(phrase) {
        const decipher = crypto_1.createDecipheriv('aes256', this.configService.get('APP_KEY'), this.resizedIV);
        return decipher.update(phrase, 'hex', 'binary') + decipher.final('binary');
    }
};
Sha256 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], Sha256);
exports.Sha256 = Sha256;
