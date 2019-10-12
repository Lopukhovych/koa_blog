import {
  timeoutPromiseDecorator,
  requestCachingDecorator,
  parseResultDecorator,
  composeUrlDecorator,
  baseHeadersDecorator,
} from './decorators';
import {compose} from './others';

const cacheMap = {};

const enhancedFetch = compose(
  timeoutPromiseDecorator(10000),
  requestCachingDecorator(cacheMap),
  parseResultDecorator,
  baseHeadersDecorator,
  composeUrlDecorator,
)(fetch);

export default enhancedFetch;
