import os from 'os';

const osDistributor = (args) => {
  try {
    const command = args.slice(2);
    console.log(`${command}: ${osOps[command]()}`);
  } catch (err) {
    throw new Error('Command not found');
  }
};

const osOps = {
  EOL: () => JSON.stringify(os.EOL),
  cpus: () => os.cpus(),
  homedir: () => os.homedir(),
  username: () => {
    const { username } = os.userInfo();
    return username;
  },
  architecture: () => os.arch(),
};

export default osDistributor;
