import os from 'os';
import { initCLI } from './services/initCLI.service.js';
import { chdir } from 'process';

export const FILE_DICTIONARY = {
  username: 'New user',
  currentDirectory: os.homedir(),
};

const appLaunch = () => {
  try {
    chdir(FILE_DICTIONARY.currentDirectory);
    getUsername(process.argv);
    greeting(FILE_DICTIONARY.username);
  } catch (e) {
    console.log(e.message);
  }
  listenerCLI();
};

const getUsername = (args) => {
  const [executer, file, ...rest] = args;
  const username = rest.join('').split('--username=')[1];

  if (!username) {
    throw new Error(
      'Please add correct username. Here the format "--username=your_username"'
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

const listenerCLI = () => {
  process.stdin.on('data', (data) => {
    try {
      const [fn, ...rest] = data.toString().split(' ');

      const command = initCLI[fn.trim()];

      if (!command) {
        throw new Error('Please add correct command');
      }

      command()(rest);
    } catch (err) {
      console.log(`Invalid input.${err.message}`);
    }

    showCurrentDirectory();
  });

  process.on('SIGINT', () => process.exit());

  process.on('exit', () =>
    console.log(
      `Thank you for using File Manager, ${FILE_DICTIONARY.username}, goodbye!`
    )
  );
};

appLaunch();
