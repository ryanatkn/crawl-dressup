import * as glob from 'glob';
import * as promisify from 'es6-promisify';
import * as fp from 'path';
import * as fs from 'fs';
import * as prettier from 'prettier';

import {loadCommentedJson, log} from './helpers';

const glb = promisify(glob);
const writeFile: any = promisify(fs.writeFile);

const imagesFileName = 'src/assets/assets.gen.ts';

// TODO use gen helpers
async function main(): Promise<void> {
  log('main', __dirname);
  const prettierCfg = await loadCommentedJson('../../config/prettier.json');
  const images = await getImagePathnames();
  log('got images', images[0], images.length);
  log('writing', `${images.length} images to ${imagesFileName}`);
  const path = fp.join(__dirname, '../../', imagesFileName);
  log('writing to path', path);
  const contents = `  
    /* auto-generated, do not edit directly!! */

    export const images = ${JSON.stringify(images)};
  `.trim();
  const finalContents = prettier.format(contents, prettierCfg);
  return await writeFile(path, finalContents, 'utf8');
}

async function getImagePathnames(): Promise<string[]> {
  const imagesGlob = fp.join(
    __dirname,
    '../../public/assets/**/*.@(png|jpg|jpeg)',
  );
  const paths: string[] = await glb(imagesGlob);
  const assetsDir = `/public/assets`;
  return paths.map(p => p.slice(p.indexOf(assetsDir) + assetsDir.length));
}

main().catch(err => log('err', err));
