import {AppDef} from '../defs';

export interface GenCtx {
  defPath: string;
  def: AppDef;
}

export interface GennedFileData {
  path: string;
  contents: string;
  writerName: string;
}

export interface WriterResults {
  files: GennedFileData[];
}

export const getDefaultResultsData = (): WriterResults => ({
  files: [],
});

// writers are reducers, pure functions that return results after applying some action context
export interface Writer {
  (results: WriterResults, ctx: GenCtx): WriterResults;
  name: string; // writers are named functions so we get some free meta data
}
