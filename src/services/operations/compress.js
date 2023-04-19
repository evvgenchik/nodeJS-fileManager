import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import errorHandler from '../../helpers/errorHandler.js';

const compress = (action) => {
  return (args) => {
    const [pathFile, pathDestination] = args.split(' ');

    const readStream = createReadStream(pathFile).on('error', (err) =>
      errorHandler(err)
    );
    const writeStream = createWriteStream(pathDestination).on('error', (err) =>
      errorHandler(err)
    );

    const brot =
      action === 'compress' ? createBrotliCompress() : createBrotliDecompress();

    pipeline(readStream, brot, writeStream, (err) => {
      if (err) errorHandler(err);
    });
  };
};

export { compress };
