const showNotification = payload => {
  return {
    type: 'SHOW_NOTIFICATION',
    payload,
  };
};

const hideNotification = (payload = {}) => {
  return {
    type: 'HIDE_NOTIFICATION',
    payload,
  };
};

export {
  showNotification,
  hideNotification,
};
