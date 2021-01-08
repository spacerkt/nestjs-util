import fs = require('fs');
import { Connection } from 'typeorm';
import { LoadFixturesResult } from '../../interfaces/load-fixtures-result.interface';

interface Entity<T = unknown> {
  table: string;
  data: T[];
}

interface EntityUpdate extends Pick<Entity, 'table'> {
  data: {
    cond: {
      column: string;
      value: unknown;
    };
  }[];
}

interface Fixtures {
  inserts: Entity[];
  updates?: EntityUpdate[];
}

function checkEntity(entity: Entity): boolean {
  if (!entity.table) {
    console.warn('Entity without "table" property. Skipping it', entity);
    return false;
  }
  if (!entity.data || !(entity.data instanceof Array)) {
    console.warn('Entity without "data" property. Skipping it', entity);
    return false;
  }
  return true;
}

export async function loadFixtures(
  path: string,
  connection: Connection,
): Promise<LoadFixturesResult> {
  try {
    const file: Fixtures | undefined | null = JSON.parse(
      fs.readFileSync(path).toString(),
    );
    if (typeof file !== 'object') {
      throw new Error('Data not supported');
    }
    const result = await connection.transaction(async manager => {
      let inserted = 0;
      let updated = 0;
      for (const entity of file.inserts) {
        if (!checkEntity(entity)) {
          return;
        }
        const { length } = await manager
          .getRepository(entity.table)
          .save(entity.data);
        inserted += length;
      }

      for (const entity of file.updates ?? []) {
        if (!checkEntity(entity)) {
          return;
        }
        const repo = manager.getRepository(entity.table);
        const result = await Promise.all(
          entity.data.map(row => {
            if (!row.cond || !(row.cond.value && row.cond.column)) {
              console.log('Row without "cond" property. Skipping it', row);
              return;
            }
            const data = { ...row };
            delete data.cond;
            return repo.update({ [row.cond.column]: row.cond.value }, data);
          }),
        );
        updated += result.reduce(
          (prev, curr) => prev + (curr.affected ?? 0),
          0,
        );
      }
      return { inserted, updated };
    });
    return {
      ...result,
      loaded: file.inserts.length + (file.updates?.length ?? 0),
    };
  } catch (err) {
    console.error('Error at loading fixtures');
    throw err;
  }
}
