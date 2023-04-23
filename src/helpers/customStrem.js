import { Writable } from 'stream';

const customWritable = new Writable({
  write(chunk, encoding, callback) {
    const result = chunk.toString();

    console.log(result);

    callback();
  },
});

export default customWritable;
