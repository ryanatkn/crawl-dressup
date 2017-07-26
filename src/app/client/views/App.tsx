// tslint:disable:jsx-no-lambda // TODO

import './App.css';

import * as React from 'react';
import * as assets from '../../../assets';
import * as t from '../types';

import {Frame} from './Frame';
import {Img} from './Img';
import {connect} from 'react-redux';
import {logger} from '../utils/log';
import {uniq} from 'lodash';

const log = logger('App', {count: ['render']});

const tileSize = 32; // TODO
const renderedTileSize = tileSize * 4; // TODO
const renderedTileSizeLg = renderedTileSize * 2; // TODO

// TODO move to reducer?
const playerImages: t.ImageData[] = assets.images
  .filter(image => image.indexOf('/dcss/player/') === 0)
  .map(image => {
    const parts = image.split('/');
    const category = t.CharacterCategoryType[parts[3]];
    return {
      url: image,
      parts,
      category,
    };
  });

// TODO move to `app.def.json`
const categoryOrder: t.CharacterCategoryType[] = [
  t.CharacterCategoryType.base,
  t.CharacterCategoryType.hair,
  t.CharacterCategoryType.beard,
  t.CharacterCategoryType.body,
  t.CharacterCategoryType.legs,
  t.CharacterCategoryType.hand1,
  t.CharacterCategoryType.hand2,
  t.CharacterCategoryType.head,
  t.CharacterCategoryType.gloves,
  t.CharacterCategoryType.boots,
  t.CharacterCategoryType.cloak,
  t.CharacterCategoryType.felids,
  t.CharacterCategoryType.drcwing,
  t.CharacterCategoryType.drchead,
];

const omittedCategories: t.CharacterCategoryType[] = [
  t.CharacterCategoryType.barding,
  t.CharacterCategoryType.ench,
  t.CharacterCategoryType.halo,
  t.CharacterCategoryType.mutations,
  t.CharacterCategoryType.transform,
];

// TODO move this and the above code
const categories: t.CharacterCategoryType[] = uniq(
  playerImages.map(i => i.category!), // tslint:disable-line:no-non-null-assertion // TODO why?
)
  .filter(i => !omittedCategories.includes(i))
  .sort((a, b) => {
    const aIdx = categoryOrder.indexOf(a);
    const bIdx = categoryOrder.indexOf(b);
    if (aIdx === -1 && bIdx === -1) {
      return aIdx < bIdx ? -1 : 1;
    } else if (aIdx === -1) {
      return 1;
    } else if (bIdx === -1) {
      return -1;
    } else if (aIdx < bIdx) {
      return -1;
    } else {
      return 1;
    }
  });

interface ConnectedStateProps {
  activeCharacterCategory: t.CharacterCategoryType;
  hoveredEntity: number | null;
  selectedCharacterImageIndex: number | null;
  // queries: t.Query[];
}
interface ConnectedDispatchProps {
  setActiveCharacterCategory(category: t.CharacterCategoryType): void;
  setHoveredEntity(index: number): void;
  setSelectedCharacterImageIndex(index: number): void;
  // updateTitle(id: string, title: string): void;
}
interface ConnectedProps extends ConnectedStateProps, ConnectedDispatchProps {}
interface Props extends Partial<ConnectedProps>, React.ClassAttributes<any> {}

class App extends React.Component<Props> {
  render(): JSX.Element {
    log('render', this);
    const {
      activeCharacterCategory,
      hoveredEntity,
      selectedCharacterImageIndex,
      setActiveCharacterCategory,
      setHoveredEntity,
      setSelectedCharacterImageIndex,
    } = this.props as ConnectedProps;
    const selectedCharacterImage = selectedCharacterImageIndex !== null
      ? playerImages[selectedCharacterImageIndex]
      : playerImages[10]; // TODO differently - default used as fallback, add to definition?
    const hoveredCharacterImage = hoveredEntity !== null
      ? playerImages[hoveredEntity]
      : playerImages[10]; // TODO differently - default used as fallback, add to definition?
    return (
      <div className="App">
        <div className="App-header">
          <h2 style={{display: 'flex', alignItems: 'flex-start'}}>
            {/* TODO clickable-img class, or btn-img, or something similar  */}
            <a
              href="https://github.com/enti-life/enti"
              style={{opacity: 0.8, marginRight: 10}}
            >
              <img src="assets/github-light.png" />
            </a>
            <div>enti</div>
          </h2>
          <div style={{display: 'flex'}}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h3
                style={{
                  fontWeight: 'bold',
                  borderBottom: '3px dashed rgba(255, 250, 245, 0.4)',
                }}
              >
                characters
              </h3>
              <h4 style={{display: 'flex'}}>
                <div style={{padding: 4}}>admin</div>
                <div
                  style={{
                    padding: 4,
                    borderBottom: '3px dashed rgba(255, 250, 245, 0.4)',
                    fontWeight: 'bold',
                  }}
                >
                  nimfot
                </div>
                <div style={{padding: 4}}>cogs</div>
                {/* apps don't work in every world, but compatibility is possible */}
              </h4>
              <h5 style={{display: 'flex'}}>
                <div
                  style={{
                    padding: 4,
                    borderBottom: '3px dashed rgba(255, 250, 245, 0.4)',
                    fontWeight: 'bold',
                  }}
                >
                  avatar
                </div>
                <div style={{padding: 4}}>worlds</div>
                <div style={{padding: 4}}>apps</div>
                {/* apps don't work in every world, but compatibility is possible */}
              </h5>
            </div>
            <div style={{height: tileSize * 2}}>
              <h3 style={{fontWeight: 'normal'}}>settings</h3>
            </div>
          </div>
          <div>
            <div style={{display: 'flex'}}>
              <div
                style={{
                  width: tileSize * 2,
                  height: tileSize * 2,
                  border: '7px dashed blue',
                  color: 'blue',
                  fontWeight: 'bold',
                  fontSize: '3em',
                }}
              >
                :)
              </div>
              <div
                style={{
                  width: tileSize * 2,
                  height: tileSize * 2,
                  border: '5px dotted violet',
                  color: 'violet',
                  fontWeight: 'bold',
                  fontSize: '3em',
                }}
              >
                :D
              </div>
            </div>
            <h5
              style={{
                height: tileSize * 2,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <small>6 more friends</small>
            </h5>
          </div>
        </div>
        <div className="App-frames" style={{padding: '8px'}}>
          <Frame>
            <div
              style={{
                flex: '1',
                display: 'flex',
                flexAlign: 'stretch',
                flexDirection: 'column',
              }}
            >
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                  }}
                >
                  <Img
                    src={`assets/dcss/player/felids/cat7.png`}
                    size={renderedTileSize}
                  />
                  <Img
                    src={`assets${selectedCharacterImage.url}`}
                    size={renderedTileSizeLg}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                  }}
                >
                  <Img
                    src={`assets${hoveredCharacterImage.url}`}
                    size={renderedTileSizeLg}
                  />
                  <Img
                    src={`assets/dcss/player/felids/cat7.png`}
                    size={renderedTileSize}
                  />
                </div>
                <div>
                  {/*TODO on click or key={i}, toggle show/hide that category in ui, and displayed toggled status, also display hovered status*/}
                  {categories.map((category, i) =>
                    <div
                      key={category}
                      style={{
                        fontWeight: category === activeCharacterCategory
                          ? 'bold'
                          : 'normal',
                        cursor: 'pointer',
                      }}
                      onClick={() => setActiveCharacterCategory(category)}
                    >
                      <small>{i}</small> {t.CharacterCategoryType[category]}
                      {' - '}
                      <small>
                        {playerImages.reduce(
                          (count, image) =>
                            image.category === category ? count + 1 : count,
                          0,
                        )}
                      </small>
                    </div>,
                  )}
                </div>
                <div>
                  TODO - show each of the selections, and allow canceling (along
                  with other megatouch actions)
                  {/* TODO need to map all selected items for the currently selected character's avatar */}
                </div>
                <div>
                  TODO - show each of the character's avatars (the currently
                  selected one being the large left one)
                  {/* TODO display all of character's avatars */}
                </div>
                <div>
                  <button type="button">export</button>
                  <button type="button">import</button>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'column',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <h3>{t.CharacterCategoryType[activeCharacterCategory]}</h3>
                  {' - '}
                  <small>
                    {playerImages.reduce(
                      (count, image) =>
                        image.category === activeCharacterCategory
                          ? count + 1
                          : count,
                      0,
                    )}
                  </small>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexShrink: 0,
                    overflow: 'auto',
                    flex: 1,
                  }}
                >
                  {playerImages.map(
                    (image, i) =>
                      image.category === activeCharacterCategory
                        ? <div
                            key={image.url}
                            title={image.url}
                            onMouseEnter={() => setHoveredEntity(i)}
                            onClick={() => setSelectedCharacterImageIndex(i)}
                            style={{
                              border: i === selectedCharacterImageIndex
                                ? '3px dashed rgba(0, 0, 0, 0.2)'
                                : i === hoveredEntity
                                  ? '3px dashed rgba(0, 0, 0, 0.4)'
                                  : '3px dashed transparent',
                            }}
                          >
                            <Img
                              src={`assets/${image.url}`}
                              size={renderedTileSize}
                            />
                          </div>
                        : null,
                  )}
                </div>
              </div>
            </div>
          </Frame>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: t.ClientState): ConnectedStateProps => ({
  // queries: state.queries,
  hoveredEntity: state.entities['ui'].hoveredEntity,
  activeCharacterCategory: state.entities['ui'].activeCharacterCategory,
  selectedCharacterImageIndex: state.entities['ui'].selectedCharacterImageIndex,
});

const mapDispatchToProps = (dispatch: t.Dispatch): ConnectedDispatchProps => ({
  setActiveCharacterCategory: (category: t.CharacterCategoryType) =>
    // TODO ideally don't need this manual type assertion, need to rewrite Redux type
    dispatch<t.Action>({
      type: t.ActionType.UpdateEntityAction,
      payload: {id: 'ui', key: 'activeCharacterCategory', value: category},
    }),
  // how do we do this correctly? give id automatically to all images? pass index?
  setHoveredEntity: (index: number) =>
    // TODO ideally don't need this manual type assertion, need to rewrite Redux type
    dispatch<t.Action>({
      type: t.ActionType.UpdateEntityAction,
      payload: {id: 'ui', key: 'hoveredEntity', value: index}, // TODO 'hoveredEntity'? or need a stack/collection?
    }),
  setSelectedCharacterImageIndex: (index: number) =>
    // TODO ideally don't need this manual type assertion, need to rewrite Redux type
    dispatch<t.Action>({
      type: t.ActionType.UpdateEntityAction,
      payload: {id: 'ui', key: 'selectedCharacterImageIndex', value: index},
    }),
});

export default (connect(mapStateToProps, mapDispatchToProps)(
  App as any,
) as any) as typeof App; // TODO fix type...how?
