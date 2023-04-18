import { getPath } from '../../helpers/getPath.js';
import path from 'path';
import fs from 'fs';

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
  return files.sort(({ name: a, name: b }) => {
    if (path.extname(a)) return -1;
    if (a > b) return -1;
    else return 1;
  });
};

class ListFileObj {
  constructor({ name }) {
    this.name = name;
    this.type = path.extname(name) ? 'file' : 'directory';
  }
}

export { up, cd, ls };
