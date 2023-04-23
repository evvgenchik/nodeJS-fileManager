import path from 'path';
import fs from 'fs';
import { getPath } from '../../helpers/argsHandler.js';
import { isFile, isDirectory } from '../../helpers/checkers.js';

const up = () => {
  process.chdir('../');
};

const cd = (pathDir) => {
  const pathToDirArr = pathDir.split(path.sep);
  const pathToFile = getPath(pathToDirArr);
  process.chdir(pathToFile);
};

const ls = async () => {
  const currentDir = process.cwd();

  const files = await fs.promises.readdir(currentDir, {
    withFileTypes: true,
  });
  const sortedFiles = sortFiles(files);
  const arrFinalObj = sortedFiles.map((el) => new ListFileObj(el));
  console.table(arrFinalObj);
};

const sortFiles = (files) => {
  const foldersArr = files.filter((el) => isDirectory(el.name)).sort();
  const restArr = files
    .filter((el) => !isDirectory(el.name))
    .sort((a, b) => (isFile(a.name) ? 1 : -1));

  return foldersArr.concat(restArr);
};

class ListFileObj {
  constructor({ name }) {
    this.name = name;
    this.type = isFile(name)
      ? 'file'
      : isDirectory(name)
      ? 'directory'
      : 'other';
  }
}

export { up, cd, ls };
