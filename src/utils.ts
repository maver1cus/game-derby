export const getRandomInteger = (a= 0, b = 1): number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

export const getRandomItemFromArray = (array: string[]): string => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
}

export const isBrowser = (): boolean => {
  return !!(typeof window != 'undefined' && window.document);
}
