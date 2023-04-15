import { getPath } from '../../helpers/getPath.js';
import path from 'path';

const up = () => {
  // const { currentDirectory } = FILE_DICTIONARY;
  // const arrCurrentDirectory = currentDirectory.split(path.sep);
  // const newDirectory =
  //   arrCurrentDirectory.length > 1
  //     ? arrCurrentDirectory.slice(0, -1)
  //     : arrCurrentDirectory;
  //FILE_DICTIONARY.currentDirectory = newDirectory.join(path.sep);

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
//const { currentDirectory } = FILE_DICTIONARY;

// const resultPath = path.resolve(currentDirectory, pathToFile);

export { up, cd };
