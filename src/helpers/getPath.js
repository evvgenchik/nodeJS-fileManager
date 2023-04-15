import path from 'path';

const getPath = (pathToFileArr) => {
  const regexp = /^'[\w\s]+'$|^"[\w\s]+"$/;

  const validPath = pathToFileArr.map((el) => {
    if (el.includes(' ')) {
      if (!regexp.test(el)) {
        throw new Error('invalid path');
      } else return el.replace(/^['"]\w+$['"]/, '');
    } else return el;
  });

  return validPath.join(path.sep);
};

export { getPath };
