import * as nwd from './operations/nwd.js';
import * as fsOp from './operations/fsOp.js';

const initCLI = {
  up: () => nwd.up,
  cd: () => nwd.cd,
  ls: () => nwd.ls,
  cat: () => fsOp.cat,
};

export { initCLI };
