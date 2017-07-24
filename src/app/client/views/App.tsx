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
  activeCharacterCategory: string | null;
  hoveredCharacterImageIndex: number | null;
  // queries: t.Query[];
}
interface ConnectedDispatchProps {
  setActiveCharacterCategory(category: t.CharacterCategoryType): void;
  setHoveredCharacterImage(index: number): void;
  // updateTitle(id: string, title: string): void;
}
interface ConnectedProps extends ConnectedStateProps, ConnectedDispatchProps {}
interface Props extends Partial<ConnectedProps>, React.ClassAttributes<any> {}

class App extends React.Component<Props> {
  render(): JSX.Element {
    log('render', this);
    const {
      activeCharacterCategory,
      hoveredCharacterImageIndex,
      setActiveCharacterCategory,
      setHoveredCharacterImage,
    } = this.props as ConnectedProps;
    const activeCharacterCategoryType = activeCharacterCategory
      ? t.CharacterCategoryType[activeCharacterCategory]
      : null;
    return (
      <div className="App">
        <div
          className="App-header"
          style={{display: 'flex', justifyContent: 'space-between'}}
        >
          <h2>enti</h2>
          <div style={{display: 'flex'}}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h3 style={{textDecoration: 'underline'}}>characters</h3>
              <div style={{display: 'flex'}}>
                <div
                  style={{
                    padding: 4,
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                  }}
                >
                  avatar
                </div>
                <div style={{padding: 4}}>worlds</div>
                <div style={{padding: 4}}>apps</div>
                {/* apps don't work in every world, but compatibility is possible */}
              </div>
            </div>
            <div style={{height: 32}}>
              <h3 style={{fontWeight: 'normal'}}>settings</h3>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <div
              style={{
                width: 32,
                height: 32,
                border: '7px dashed blue',
                color: 'blue',
                fontWeight: 'bold',
              }}
            >
              :)
            </div>
            <div
              style={{
                width: 32,
                height: 32,
                border: '5px dotted violet',
                color: 'violet',
                fontWeight: 'bold',
              }}
            >
              :D
            </div>
            <div style={{height: 32}}>
              <small>6 more friends</small>
            </div>
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
                    src={`assets/dcss/player/base/centaur_darkgrey_m.png`}
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
                    src={`assets/dcss/player/base/centaur_darkgrey_m.png`}
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
                        fontWeight: t.CharacterCategoryType[category] ===
                          activeCharacterCategory
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
              </div>
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <div key={activeCharacterCategoryType}>
                  <div>
                    {activeCharacterCategoryType}
                    {' - '}
                    <small>
                      {playerImages.reduce(
                        (count, image) =>
                          image.category === activeCharacterCategoryType
                            ? count + 1
                            : count,
                        0,
                      )}
                    </small>
                  </div>
                  <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {playerImages.map(
                      (image, i) =>
                        image.category === activeCharacterCategoryType
                          ? <div
                              key={image.url}
                              title={image.url}
                              onMouseEnter={() => setHoveredCharacterImage(i)}
                              style={{
                                border: i === hoveredCharacterImageIndex
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
            </div>
          </Frame>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: t.ClientState): ConnectedStateProps => ({
  // queries: state.queries,
  activeCharacterCategory: state.activeCharacterCategory,
  hoveredCharacterImageIndex: state.hoveredCharacterImageIndex,
});

const mapDispatchToProps = (dispatch: t.Dispatch): ConnectedDispatchProps => ({
  setActiveCharacterCategory: (category: t.CharacterCategoryType) =>
    dispatch<t.Action>({
      type: t.ActionType.SetActiveCharacterCategoryAction,
      payload: {category},
    }),
  // how do we do this? give id automatically to all images? pass index?
  setHoveredCharacterImage: (index: number) =>
    dispatch<t.Action>({
      type: t.ActionType.SetHoveredCharacterImageAction,
      payload: {index},
    }),
  // updateTitle: (
  //   id: string,
  //   title: string, // TODO unify by making generic? update doc type?
  // ) =>
  //   dispatch<t.Action>({
  //     type: t.ActionType.UpdateQueryAction,
  //     payload: {id, title},
  //   }),
});

export default (connect(mapStateToProps, mapDispatchToProps)(
  App as any,
) as any) as typeof App; // TODO fix type...how?
