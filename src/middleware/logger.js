const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('The Action:', action);

  //   dispatch action to update the state
  const resultValue = next(action);
  console.log('The New State:', store.getState());
  console.groupEnd();
  return resultValue;
};

export default logger;
