import readline = require('readline');
import fs = require('fs');

export function promisifyLineReader<T>(
  path: string,
  cb: (line: string) => Promise<T>,
  mustOpenFile = true,
): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    let lineReader: readline.Interface;
    const input = fs.createReadStream(path);
    try {
      lineReader = readline.createInterface({
        input,
      });
    } catch (err) {
      reject(err);
    }

    const cbs: Promise<T>[] = [];
    input.on('error', err => {
      const re = new RegExp('ENOENT: no such file or directory, open');
      if (!mustOpenFile && err.message.match(re)) {
        resolve([]);
      } else {
        reject(err);
      }
    });

    lineReader.on('line', line => cbs.push(cb(line)));

    lineReader.on('close', () =>
      Promise.all(cbs)
        .then(values => resolve(values))
        .catch(err => reject(err)),
    );
  });
}
