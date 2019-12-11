import {
  timeoutPromiseDecorator,
  requestCachingDecorator,
  parseResultDecorator,
  composeUrlDecorator,
  baseHeadersDecorator,
  baseGetDecorator,
} from './decorators';
import {compose} from './others';

const cacheMap = {};

const enhancedFetch = compose(
  timeoutPromiseDecorator(10000),
  requestCachingDecorator(cacheMap),
  parseResultDecorator,
  baseHeadersDecorator,
  composeUrlDecorator,
  baseGetDecorator,
)(fetch);

export default enhancedFetch;
