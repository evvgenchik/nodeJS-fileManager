import { getPath } from '../../helpers/getPath.js';
import path from 'path';
import fs from 'fs';

const up = () => {
  process.chdir('../');
};

const cd = (args) => {
  try {
    const pathToFileStr = args.join(' ').trim('');
    const pathToFileArr = pathToFileStr.split(path.sep);

    const pathToFile = getPath(pathToFileArr);

    process.chdir(pathToFile);
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};

const ls = async () => {
  const currentDir = process.cwd();

  try {
    const files = await fs.promises.readdir(currentDir, {
      withFileTypes: true,
    });
    const sortedFiles = sortFiles(files);
    const arrFinalObj = sortedFiles.map((el) => new ListFileObj(el));
    console.table(arrFinalObj);
  } catch (err) {
    console.log(`Erorr: ${err.message}`);
  }
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
