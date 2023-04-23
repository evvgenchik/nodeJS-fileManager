import fs from 'fs';

function isFile(path) {
  try {
    const stats = fs.statSync(path);
    return stats.isFile();
  } catch (err) {
    console.error(err);
  }
}
function isDirectory(path) {
  try {
    const stats = fs.statSync(path);
    return stats.isDirectory();
  } catch (err) {
    console.error(err);
  }
}

export { isDirectory, isFile };
