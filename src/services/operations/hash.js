import fs from 'fs';
import crypto from 'node:crypto';
import errorHandler from '../../helpers/errorHandler.js';

const hash = (pathFile) => {
  const readStream = fs
    .createReadStream(pathFile, 'utf-8')
    .on('error', (err) => errorHandler(err));
  const hash = crypto.createHash('sha256');

  readStream.on('data', (chunk) => {
    const hashFile = hash.update(chunk).digest('hex');
    console.log(hashFile);
  });
  readStream.on('error', (err) => errorHandler(err));
};

export default hash;
