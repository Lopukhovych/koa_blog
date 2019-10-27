export const timeoutPromise = async (timeout, promise) => Promise.race([
  promise,
  new Promise(((resolve, reject) => {
    setTimeout(() => { reject('Request timed out'); }, timeout);
  })),
]);

export const compose = (...fns) => fns.reduceRight((prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
  (value) => value);

export const getStorageItem = (item) => localStorage.getItem(item);

export const setStorageItem = (key, value) => localStorage.setItem(key, value);

export const removeStorageItem = (key) => localStorage.removeItem(key);
