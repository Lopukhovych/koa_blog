export const timeoutPromise = async (timeout, promise) => {
  return Promise.race([
    promise,
    new Promise(function(resolve, reject){
      setTimeout(function() { reject('Request timed out'); }, timeout);
    })
  ]);
};

export const compose = (...fns) =>
  fns.reduceRight((prevFn, nextFn) =>
      (...args) => nextFn(prevFn(...args)),
    value => value
  );
