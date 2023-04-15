import * as nwd from './operations/nwd.js';

const initCLI = {
  up: () => nwd.up,
  cd: () => nwd.cd,
};

export { initCLI };
