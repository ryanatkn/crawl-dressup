import {random, sample} from 'lodash';
import * as ulid from 'ulid';

import {fillArray} from './array';

export const LOWER_ALPHA_CHARS = 'abcdefghijklmnopqrstuvwxyz'.split('');
export const UPPER_ALPHA_CHARS = LOWER_ALPHA_CHARS.map(c => c.toUpperCase());

export const ALPHA_CHARS = UPPER_ALPHA_CHARS.concat(LOWER_ALPHA_CHARS);
export const NUM_CHARS = '0123456789'.split('');
export const ALPHA_NUM_CHARS = NUM_CHARS.concat(ALPHA_CHARS);

export const ID_SEPARATOR = '_';
export const ID_RAND_SUFFIX_LENGTH = 12;

export const id = ulid;

export const int = (max: number = Number.MAX_SAFE_INTEGER): number =>
  random(max); // tslint:disable-line:no-unnecessary-callback-wrapper (TODO tslint bug)

export const num = (max: number = Number.MAX_VALUE): number => random(max); // tslint:disable-line:no-unnecessary-callback-wrapper (TODO tslint bug)

export const char = (charSet: string[] = ALPHA_NUM_CHARS): string =>
  sample(charSet) as string;

export const str = (
  minLength: number = 32,
  maxLength: number = minLength,
  charSet: string[] = ALPHA_NUM_CHARS,
): string =>
  fillArray(random(minLength, maxLength), () => char(charSet)).join('');
