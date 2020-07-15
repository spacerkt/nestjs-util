/**
 * mergeManyToOneEntity - Used to map an array of Entity2 to a property in an Entity1
 * Entity2 should have a foreign key to Entity1
 * @param entities1 array of entities
 * @param e1PK primary key of entitie1
 * @param e1Prop which property of entitie1 will receive the array of entities2
 * @param entities2 array of entities2
 * @param entityFK fk property of entity2 to entity1
 */
export function mergeManyToOneEntity<E1, E2>(
  entities1: readonly E1[],
  e1PK: keyof E1,
  e1Prop: keyof E1,
  entities2: readonly E2[],
  entityFK: keyof E2,
) {
  if (!entities2.length) {
    return;
  }
  if (e1PK === e1Prop) {
    throw new Error('e1PK must not be equal to e1Prop');
  }
  const pk = e1PK as string;
  const prop = e1Prop as string;
  const fk = entityFK as string;
  const entitiesMap: { [key: string]: E2[] } = {};
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
