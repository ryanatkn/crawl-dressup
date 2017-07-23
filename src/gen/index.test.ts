import {GenCtx, generate} from '../gen';
import {getWritersList, loadCommentedJson} from '../tasks/helpers';

it('generates some files', async () => {
  const defPath = '../_userProject/defs/app.def.json';
  const prettierCfg = await loadCommentedJson('../../config/prettier.json');
  const ctx: GenCtx = {
    def: await loadCommentedJson(defPath),
    defPath,
    prettierCfg,
  };
  const generated = generate(ctx, getWritersList());
  expect(generated.files.length).toBe(6);
});
