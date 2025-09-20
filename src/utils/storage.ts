
export const setLocalStorage = <T extends object>(itemName: string, items: T | T[]) => {
  localStorage.setItem(itemName, JSON.stringify(items));
};

export const getFromLocalStorage = (itemName: string) => {
  const tasks = localStorage.getItem(itemName);
  if (!tasks) return [];
  return JSON.parse(tasks);
};
