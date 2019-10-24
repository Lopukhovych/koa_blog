import hash from 'object-hash';
import {timeoutPromise} from './others';


const timeoutPromiseDecorator = (ms) => (requestFunc) => async (...args) => timeoutPromise(
  ms,
  requestFunc.call(null, ...args),
);

// api

function ResponseException(response) {
  this.code = response.status;
  this.message = response.message;
  this.statusText = response.statusText;
}

const parseRes = async (res) => {
  if (res.ok) {
    return res.json();
  }
  throw new ResponseException(res);
};

const parseResultDecorator = (requestFunc) => async (...args) => {
  const res = await requestFunc.call(null, ...args);
  return parseRes(res);
};

const composeUrlDecorator = (requestFunc) => async (...args) => {
  const absoluteUrl = `http://localhost:3200${args[0]}`;
  // const ags = [...args, absoluteUrl]
  args[0] = absoluteUrl;
  return requestFunc.call(null, ...args);
};

const baseHeadersDecorator = (requestFunc) => async (...args) => {
  const apiHeaders = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: localStorage.getItem('jwt_token'),
  };

  const headers = {
    ...(args[1] && args[1].headers ? args[1].headers : {}),
    ...apiHeaders,
  };
  args[1] = args[1]
    ? {
      ...args[1],
      headers: { ...headers },
    }
    : {
      headers: apiHeaders,
    };
  return requestFunc.call(null, ...args);
};

const requestCachingDecorator = (cacheMap) => (requestFunc) => async (...args) => {
  const [url, options, useCache] = args;
  const optionHash = hash({options});

  if (useCache !== false && cacheMap[url] && cacheMap[url][optionHash]) {
    return Promise.resolve(cacheMap[url][optionHash]);
  }

  const res = await requestFunc.call(null, url, options);

  if (!cacheMap[url]) cacheMap[url] = {};
  cacheMap[url][optionHash] = res;

  return res;
};

export {
  timeoutPromiseDecorator,
  parseResultDecorator,
  requestCachingDecorator,
  composeUrlDecorator,
  baseHeadersDecorator,
};
