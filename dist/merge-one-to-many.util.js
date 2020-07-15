"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeManyToOneEntity = void 0;
function mergeManyToOneEntity(entities1, e1PK, e1Prop, entities2, entityFK) {
    if (!entities2.length) {
        return;
    }
    if (e1PK === e1Prop) {
        throw new Error('e1PK must not be equal to e1Prop');
    }
    const pk = e1PK;
    const prop = e1Prop;
    const fk = entityFK;
    const entitiesMap = {};
    entities1.forEach((e1, index, arr) => {
        if (!arr[index][prop]) {
            arr[index][prop] = [];
        }
        entitiesMap[e1[pk]] = arr[index][prop];
    });
    entities2.forEach(entity => {
        entitiesMap[entity[fk]].push(entity);
    });
}
exports.mergeManyToOneEntity = mergeManyToOneEntity;
