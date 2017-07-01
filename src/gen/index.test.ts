import {getWritersList, loadCommentedJson} from '../tasks/helpers';

import {GenCtx, generate} from '../gen';

it('generates some files', async () => {
  const defPath = '../defs/app.def.json';
  const ctx: GenCtx = {
    def: await loadCommentedJson(defPath),
    defPath,
  };
  const generated = generate(ctx, getWritersList());
  expect(generated.files.length).toBe(6);
});
