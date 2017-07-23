import * as fp from 'path';
import * as fs from 'fs';
import * as promisify from 'es6-promisify';
import * as stripJsonComments from 'strip-json-comments';
import * as writers from '../gen/writers';

import {Writer} from '../gen';

// TODO this is expected to run only in node.. do something to enforce that or something

// TODO doesn't get the correct type, had to manually add
const readFile: (
  path: string,
  options: {encoding: 'utf8'},
) => Promise<string> = promisify(fs.readFile);

export const loadCommentedJson = async (path: string): Promise<any> => {
  const contents = await readFile(fp.join(__dirname, path), {encoding: 'utf8'});
  const stripped = stripJsonComments(contents);
  const parsed = JSON.parse(stripped);
  return parsed;
};

// The list of writers determines what gets written to the results data
// TODO move this to config
export const getWritersList = (): Writer[] => [
  writers.tsDefWriter,
  writers.tsTypeWriter,
  writers.tsMockWriter,
  writers.tsActionWriter,
  writers.tsActionTestWriter,
  writers.tsReducerTestWriter,
  writers.fileWrapperWriter,
];
