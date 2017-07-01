export * from '../../types/helpers';
export * from '../../defs/helpers';

export * from './tsHelpers';

import {GennedFileData} from '../../gen';

export const isJs = (file: GennedFileData): boolean =>
  !!file.path.match(/^.+\.js$/g);

export const isTs = (file: GennedFileData): boolean =>
  !!file.path.match(/^.+\.(ts|tsx)$/g);

export const isJsLike = (file: GennedFileData): boolean =>
  !!file.path.match(/^.+\.(js|ts|tsx)$/g);

export const renderOpenMultilineComment = (file: GennedFileData): string =>
  isJsLike(file) ? '/*' : '/*';

export const renderCloseMultilineComment = (file: GennedFileData): string =>
  isJsLike(file) ? '*/' : '*/';
