export const setLocalStorage = (key, value, noTTL) => {
  const item = {
    value: value,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorage = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  return item.value;
};
