import fs from 'fs';
import path from 'path';
import { pipeline } from 'node:stream/promises';
import errorHandler from '../../helpers/errorHandler.js';
import { getPath } from '../../helpers/argsHandler.js';

const cat = async (filename) => {
  const pathToFile = getPath(filename.split(path.sep));
  const readStream = fs.createReadStream(pathToFile, 'utf-8');

  readStream.pipe(process.stdout);
  readStream.on('end', () => console.log());

  readStream.on('error', function (err) {
    console.log(`Invalid input ${err.message}`);
  });
};

const add = async (fileName) => {
  await fs.promises.writeFile(fileName, '');
};

const rn = async (args) => {
  const [oldPath, newName] = args.split(' ');
  await fs.promises.rename(oldPath, newName);
};

const cp = async (args) => {
  const [pathFile, pathNewDirec] = args.split(' ');
  const readStream = fs
    .createReadStream(pathFile, 'utf-8')
    .on('error', errorHandler);
  const writeStream = fs
    .createWriteStream(pathNewDirec, 'utf-8')
    .on('error', errorHandler);

  readStream
    .pipe(writeStream)
    .on('error', errorHandler)
    .on('finish', () => {
      console.log(
        `You have successfully created a ${pathFile} copy. The new file name is ${pathNewDirec}.`
      );
    });
};

const rm = async (pathFile) => {
  await fs.promises.unlink(pathFile);
};

const mv = async (args) => {
  const [pathFile] = args.split(' ');
  await cp(args);
  await rm(pathFile);
};

export { cat, add, rn, cp, mv, rm };
