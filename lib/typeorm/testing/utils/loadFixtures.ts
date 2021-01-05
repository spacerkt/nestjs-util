import fs = require('fs');
import { Connection } from 'typeorm';

interface IEntity<T = unknown> {
  table: string;
  data: T[];
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
    const file: IEntity[] | undefined | null = JSON.parse(
      fs.readFileSync(path).toString(),
    );
    if (!(file instanceof Array)) {
      throw new Error('Data not supported');
    }
    let inserted = 0;
    for (const entity of file) {
      if (!entity.table) {
        console.warn('Entity without "table" property. Skipping it');
        return;
      }
      if (!entity.data || !(entity.data instanceof Array)) {
        console.warn('Entity without "data" property. Skipping it');
        return;
      }
      const { length } = await connection
        .getRepository(entity.table)
        .save(entity.data);
      inserted += length;
    }
    return {
      inserted,
      loaded: file.length,
    };
  } catch (err) {
    console.error('Error at loading fixtures');
    throw err;
  }
}
