import fs = require('fs');
import { Connection } from 'typeorm';

interface IEntity {
  table: string;
}

interface IResult {
  loaded: number;
  inserted: number;
}

export async function loadFixtures(
  path: string,
  connection: Connection,
): Promise<IResult> {
  try {
    const file = JSON.parse(fs.readFileSync(path).toString());
    if (!(file instanceof Array)) {
      throw new Error('Data not supported');
    }
    const result = await Promise.all(
      file.map((entity: IEntity) => {
        if (!entity.table) {
          console.warn('Entity without "table" property. Skipping it');
          return;
        }
        return connection
          .getRepository(entity.table)
          .save({ ...entity, table: undefined });
      }),
    );
    return { loaded: file.length, inserted: result.length };
  } catch (err) {
    console.error('Error at loading fixtures');
    throw err;
  }
}
