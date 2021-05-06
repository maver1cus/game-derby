// @ts-nocheck
export const getRandomInteger = function(a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomItemFromArray = function(array) {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

export const isBrowser = () => typeof window != 'undefined' && window.document;
