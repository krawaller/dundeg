import * as Promise from 'bluebird';

Promise.config({
  longStackTraces: true // only in dev, fix with flag
});

export default Promise;
