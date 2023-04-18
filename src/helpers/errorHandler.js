const errorHandler = (err) => {
  console.log('\x1b[31m', `Invalid input: ${err.message}`);
};

export default errorHandler;
