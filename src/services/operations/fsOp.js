import path from 'path';
import fs from 'fs';

const cat = (args) => {
  const filename = args.join(' ').trim('');
  const readableStream = fs.createReadStream(filename, 'utf-8');

  readableStream.on('data', (chunk) => {
    console.log(chunk);
  });

  readableStream.on('error', function (err) {
    console.log('Invalid input');
  });
};

export { cat };
