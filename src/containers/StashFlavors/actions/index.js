const addFlavor = payload => {
  return {
    type: 'ADD_FLAVOR',
    payload,
  };
};

export {
  addFlavor,
};
