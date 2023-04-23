export const errorHandlerInit = (err) => {
  console.log(`\x1b[31m Error: ${err.message} \x1b[0m`);
};
const errorHandler = (err) => {
  console.log(`\x1b[31m Invalid input: ${err.message} \x1b[0m`);
};
export const successHandler = (op) => {
  console.log(`\x1b[32m Operation <${op}> was completed successfully \x1b[0m`);
};

export default errorHandler;
