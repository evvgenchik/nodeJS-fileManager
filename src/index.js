import os from 'os';
import { initCLI } from './services/initCLI.service.js';
import { chdir } from 'process';
import { argsConverter } from './helpers/argsHandler.js';
import errorHandler, {
  errorHandlerInit,
  successHandler,
} from './helpers/customLogs.js';

export const FILE_DICTIONARY = {
  username: 'New user',
  currentDirectory: os.homedir(),
};

const appLaunch = () => {
  try {
    chdir(FILE_DICTIONARY.currentDirectory);
    getUsername(process.argv);
    greeting(FILE_DICTIONARY.username);
    showCurrentDirectory();
  } catch (e) {
    errorHandlerInit(e);
  }
  listenerCLI();
};

const getUsername = (args) => {
  const [executer, file, ...rest] = args;
  const username = rest.join('').split('--username=')[1];

  if (!username) {
    throw new Error(
      `Please add correct username. Here the format "--username=your_username". Now your name is defined by default like "${FILE_DICTIONARY.username}"`
    );
  }

  FILE_DICTIONARY.username = username;
};

const greeting = (name) => {
  console.log(`Welcome to the File Manager, ${name}!`);
};

const showCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

const listenerCLI = async () => {
  process.stdin.on('data', async (data) => {
    try {
      const { fn, rest } = argsConverter(data);
      const command = initCLI[fn];

      if (!command) {
        throw new Error('Please add correct command');
      }

      const commandFn = await command();
      await commandFn(rest)?.catch(errorHandler);

      successHandler(fn);
      showCurrentDirectory();
    } catch (err) {
      errorHandler(err);
    }
  });

  process.on('SIGINT', () => process.exit());

  process.on('exit', () =>
    console.log(
      `Thank you for using File Manager, ${FILE_DICTIONARY.username}, goodbye!`
    )
  );
};

appLaunch();
