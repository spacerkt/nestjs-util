"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateToUTC = void 0;
function dateToUTC(date) {
    return Date.UTC(date.getUTCFullYear(), date.getUTCDay(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}
exports.dateToUTC = dateToUTC;
