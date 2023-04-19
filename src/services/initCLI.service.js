import * as nwd from './operations/nwd.js';
import * as fsOp from './operations/fsOp.js';
import osDistributor from './operations/osOp.js';

const initCLI = {
  up: () => nwd.up,
  cd: () => nwd.cd,
  ls: () => nwd.ls,
  cat: () => fsOp.cat,
  add: () => fsOp.add,
  rn: () => fsOp.rn,
  cp: () => fsOp.cp,
  mv: () => fsOp.mv,
  rm: () => fsOp.rm,
  os: () => osDistributor,
};

export { initCLI };
