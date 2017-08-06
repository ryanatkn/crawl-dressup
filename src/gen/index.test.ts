import {GenCtx, generate} from '../gen';
import {getWritersList, loadCommentedJson} from '../tasks/helpers';

it('generates some files', async () => {
  const clayDefPath = '../app/defs/app.clay.json';
  const clay = await loadCommentedJson(clayDefPath);
  const prettierCfg = await loadCommentedJson('../../config/prettier.json');
  const ctx: GenCtx = {
    clay,
    clayDefPath,
    prettierCfg,
  };
  const generated = generate(ctx, getWritersList());
  expect(generated.files.length).toBe(6);
});
