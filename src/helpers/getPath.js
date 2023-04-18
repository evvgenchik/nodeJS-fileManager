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

const argsConverter = (args) => {
  const [comand, ...restArgs] = args.toString().split(' ');
  const rest = restArgs.join(' ').trim('');
  const fn = comand.trim();
  return { fn, rest };
};

export { getPath, argsConverter };
