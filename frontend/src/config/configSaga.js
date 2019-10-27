import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware({
  onError: (error, errorInfo) => {
    console.error(
      'Saga had an error and is now stopped.',
      errorInfo.sagaStack,
      error,
    );
  },
});

export default sagaMiddleware;
