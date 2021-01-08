import fs = require('fs');
import { Connection } from 'typeorm';
import { LoadFixturesResult } from '../../interfaces/load-fixtures-result.interface';

interface Entity<T = unknown> {
  table: string;
  data: T[];
}

interface EntityUpdate extends Entity {
  cond: {
    column: string;
    data: unknown;
  };
}

interface Fixtures {
  inserts: Entity[];
  updates?: EntityUpdate[];
}

function checkEntity(entity: Entity): boolean {
  if (!entity.table) {
    console.warn('Entity without "table" property. Skipping it');
    return false;
  }
  if (!entity.data || !(entity.data instanceof Array)) {
    console.warn('Entity without "data" property. Skipping it');
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
        if (!entity.cond || !(entity.cond.data && entity.cond.column)) {
          console.warn('Entity without primary column descriptor. Skipping it');
          return;
        }
        const { affected } = await manager
          .getRepository(entity.table)
          .update({ [entity.cond.column]: entity.cond.data }, entity.data);
        updated += affected ?? 0;
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
