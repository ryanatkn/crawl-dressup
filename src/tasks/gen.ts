import * as fp from 'path';
import * as fs from 'fs';
import * as Ajv from 'ajv';
import * as prettier from 'prettier';

import {GenCtx, generate} from '../gen';
import {getWritersList, loadCommentedJson} from './helpers';

import {logger} from '../utils/log';
import {validateClay} from '../app/defs';

const log = logger('task:gen');

/*

    npm run gen

NOTE! Any changes to this file must be followed by a manual `npm run gen`.
TODO need better workflow

*/

// TODO config/env
const appDir = '../app';
const clayDefPath = `${appDir}/defs/app.clay.json`;
const prettierCfgPath = '../../config/prettier.json';

const saveFile = (destPath: string, contents: string): void => {
  log('saving', destPath);
  const finalDestPath = fp.join(__dirname, appDir, destPath);
  fs.writeFileSync(finalDestPath, contents, {
    encoding: 'utf8',
  });
  log('saved~', finalDestPath);
};

async function main(): Promise<void> {
  log('🗲 gen');
  log('app source', clayDefPath);
  log('__dirname', __dirname);
  log('__filename', __filename, fp.join(__dirname, clayDefPath));

  const clay = validateClay(await loadCommentedJson(clayDefPath));
  const prettierCfg = await loadCommentedJson(prettierCfgPath);

  // Load the clay app data and generate some code
  const ctx: GenCtx = {
    clay,
    clayDefPath,
    prettierCfg,
  };

  // Validate clay with the meta schema
  const ajv = new Ajv();
  ajv.compile(clay);

  // `gen.generate` is a pure function - is does not perform any io actions or mutate anything external
  const resultsData = generate(ctx, getWritersList());

  // write the results to the file system, to fit expected programmer workflow
  for (const file of resultsData.files) {
    let finalContents = file.contents;
    try {
      finalContents = prettier.format(file.contents, prettierCfg);
    } catch (err) {
      log(`failed to prettify, saving unprettified version: ${err}`);
    }
    saveFile(file.path, finalContents);
  }

  // all done
  log('✔ gen');
}

main().catch(err => {
  log('err', err);
  throw err;
});
