import * as fs from 'fs';
import * as fp from 'path';
import * as prettier from 'prettier';
import * as jsonschema from 'jsonschema';

import {generate, GenCtx} from '../gen';

import {getWritersList, loadCommentedJson, log} from './helpers';

/*

    npm run gen

NOTE! Any changes to this file must be followed by a manual `npm run gen`.
TODO need better workflow

*/

// TODO task arg? or read from a master config somewhere? (hint)
const appSourcePath = '../defs/app.def.json';

const saveFile = (destPath: string, contents: string): void => {
  log('saving', destPath);
  const finalDestPath = fp.join(__dirname, destPath);
  fs.writeFileSync(finalDestPath, contents, {
    encoding: 'utf8',
  });
  log('saved~', finalDestPath);
};

async function main(): Promise<void> {
  log('🗲 gen');
  log('app source', appSourcePath);
  log('__dirname', __dirname);
  log('__filename', __filename, fp.join(__dirname, appSourcePath));

  // Load the app definition and generate some code
  const ctx: GenCtx = {
    defPath: appSourcePath,
    def: await loadCommentedJson(appSourcePath),
  };

  const prettierCfg = await loadCommentedJson('../../config/prettier.json');
  const baseSchema = await loadCommentedJson('../defs/jsonschema-meta.json');

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
