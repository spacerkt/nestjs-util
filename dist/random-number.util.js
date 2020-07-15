"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumber = void 0;
function randomNumber(length) {
    return (Math.pow(10, length)
        .toString()
        .slice(length - 1) +
        Math.floor(Math.random() * Math.pow(10, length) + 1).toString()).slice(-length);
}
exports.randomNumber = randomNumber;
