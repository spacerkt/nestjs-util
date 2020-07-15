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
exports.GetAllDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var SQLOrder;
(function (SQLOrder) {
    SQLOrder["DESC"] = "DESC";
    SQLOrder["ASC"] = "ASC";
})(SQLOrder || (SQLOrder = {}));
class GetAllDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiPropertyOptional({ type: String }),
    __metadata("design:type", String)
], GetAllDto.prototype, "search", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiPropertyOptional({ description: 'Order by which column', type: String }),
    __metadata("design:type", String)
], GetAllDto.prototype, "orderBy", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(SQLOrder),
    swagger_1.ApiPropertyOptional({ enum: SQLOrder, type: String }),
    __metadata("design:type", String)
], GetAllDto.prototype, "order", void 0);
exports.GetAllDto = GetAllDto;
