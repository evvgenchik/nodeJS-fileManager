import fs from 'fs';
import crypto from 'node:crypto';
import errorHandler from '../../helpers/errorHandler.js';
import customWritable from '../../helpers/customStrem.js';
import { pipeline } from 'stream/promises';
import { Transform } from 'stream';

const hash = async (pathFile) => {
  const readStream = fs
    .createReadStream(pathFile, 'utf-8')
    .on('error', (err) => errorHandler(err));

  const myTransform = new Transform({
    transform(chunk, encoding, callback) {
      const hash = crypto.createHash('sha256');
      callback(null, hash.update(chunk).digest('hex'));
    },
  });

  await pipeline(readStream, myTransform, customWritable);
};

export default hash;
