"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binarySearch = void 0;
function binarySearch(arr, value, compare) {
    let min = 0;
    let max = arr.length;
    while (min < max) {
        const mid = min + ((max - min) >> 1);
        const element = arr[mid];
        const comp = compare(element, value);
        if (comp == 0) {
            return mid;
        }
        if (comp < 0) {
            min = mid + 1;
        }
        else {
            max = mid;
        }
    }
    return -1;
}
exports.binarySearch = binarySearch;
