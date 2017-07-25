import * as fp from 'path';
import * as fs from 'fs';
import * as jsonschema from 'jsonschema';
import * as prettier from 'prettier';

import {GenCtx, generate} from '../gen';
import {getWritersList, loadCommentedJson} from './helpers';

import {logger} from '../utils/log';
import {validateAppDef} from '../app/defs';

const log = logger('task:gen');

/*

    npm run gen

NOTE! Any changes to this file must be followed by a manual `npm run gen`.
TODO need better workflow

*/

// TODO config/env
const appDir = '../app';
const appDefPath = `${appDir}/defs/app.def.json`;
const prettierCfgPath = '../../config/prettier.json';
const baseSchemaPath = '../gen/defs/jsonschema-meta.json';

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
  log('app source', appDefPath);
  log('__dirname', __dirname);
  log('__filename', __filename, fp.join(__dirname, appDefPath));

  const def = validateAppDef(await loadCommentedJson(appDefPath));
  const prettierCfg = await loadCommentedJson(prettierCfgPath);
  const baseSchema = await loadCommentedJson(baseSchemaPath);

  // Load the app definition and generate some code
  const ctx: GenCtx = {
    defPath: appDefPath,
    def,
    prettierCfg,
  };

  // This validation step is not very useful at the moment,
  // but it can be expanded to better validate the definition file
  // by editing the `baseSchema` JSON file directly.
  const validatorResult = jsonschema.validate(ctx.def, baseSchema);
  if (validatorResult.errors.length) {
    throw new Error(`Validator error: ${validatorResult.errors[0]}`);
  }

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
