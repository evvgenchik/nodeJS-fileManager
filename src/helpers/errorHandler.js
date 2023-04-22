export const errorHandlerInit = (err) => {
  console.log(`\x1b[31m Error: ${err.message} \x1b[0m`);
};
const errorHandler = (err) => {
  console.log(`\x1b[31m Invalid input: ${err.message} \x1b[0m`);
};

export default errorHandler;
