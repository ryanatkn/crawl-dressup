import * as t from '../types';

import {playerImages} from '../reducers';
import {sortItems} from '../../../utils/array';
import {uniq} from 'lodash';

export const tileSize = 32; // TODO
export const renderedTileSize = tileSize * 4; // TODO
export const renderedTileSizeLg = renderedTileSize * 2; // TODO
export const renderedTileSizeSm = renderedTileSize / 2; // TODO

// TODO move to `app.clay.json`
export const categoryRenderOrder: t.CharacterCategory[] = [
  t.CharacterCategory.cloak,
  t.CharacterCategory.base,
  t.CharacterCategory.hair,
  t.CharacterCategory.beard,
  t.CharacterCategory.body,
  t.CharacterCategory.legs,
  t.CharacterCategory.head,
  t.CharacterCategory.gloves,
  t.CharacterCategory.boots,
  t.CharacterCategory.hand1,
  t.CharacterCategory.hand2,
  t.CharacterCategory.felids,
];

export const categoryMenuOrder: t.CharacterCategory[] = [
  t.CharacterCategory.base,
  t.CharacterCategory.hair,
  t.CharacterCategory.beard,
  t.CharacterCategory.body,
  t.CharacterCategory.legs,
  t.CharacterCategory.hand1,
  t.CharacterCategory.hand2,
  t.CharacterCategory.head,
  t.CharacterCategory.gloves,
  t.CharacterCategory.boots,
  t.CharacterCategory.cloak,
  t.CharacterCategory.felids,
];

export const omittedCategories: t.CharacterCategory[] = [
  t.CharacterCategory.barding,
  t.CharacterCategory.drcwing,
  t.CharacterCategory.drchead,
  t.CharacterCategory.ench,
  t.CharacterCategory.halo,
  t.CharacterCategory.mutations,
  t.CharacterCategory.transform,
];

// TODO move this and the above code
export const categories: t.CharacterCategory[] = uniq(
  playerImages.map(i => i.category),
)
  .filter(i => !omittedCategories.includes(i))
  .sort(sortItems(categoryRenderOrder));

export const categoriesOrderedForMenu = categories
  .slice()
  .sort(sortItems(categoryMenuOrder));
