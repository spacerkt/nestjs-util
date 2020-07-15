"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptor = void 0;
function descriptor(data, context) {
    return {
        type: typeof data,
        value: data,
        context,
    };
}
exports.descriptor = descriptor;
