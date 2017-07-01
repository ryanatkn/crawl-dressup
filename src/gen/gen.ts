import {logger} from '../utils/logger';

import {GenCtx, Writer, WriterResults, getDefaultResultsData} from './types';
import {validateResults, validateWriters} from './validate';

const log = logger('gen');

// TODO consider making this async, or at least allowing writers to use promises
// Writers are reducers, pure functions that return state as a function of,
// in this case, `Writers`. They can return whatever results at their stage of the pipeline.
export const generate = (ctx: GenCtx, writers: Writer[]): WriterResults => {
  validateWriters(writers);
  return writers.reduce((results, writer) => {
    log('writing', undefined, writer.name); // TODO the undefined smells
    const writerResults = writer(results, ctx);
    validateResults(writerResults);
    // TODO could diff results
    log('wrote~~', undefined, writer.name); // TODO the undefined smells
    return writerResults;
  }, getDefaultResultsData());
};
