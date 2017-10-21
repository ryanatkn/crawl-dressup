// tslint:disable:jsx-no-lambda // TODO

import './App.css';

import * as React from 'react';
import * as k from '../constants';
import * as t from '../types';

import {Costume} from './Costume';
import {CostumeManager} from './CostumeManager';
import {Frame} from './Frame';
import {Img} from './Img';
import {connect} from 'react-redux';
import {logger} from '../utils/log';
import {playerImages} from '../reducers';

const log = logger('App', {count: ['render']});

interface ConnectedStateProps {
  activeCharacterCategory: t.CharacterCategory;
  hoveredEntityId: t.Id | null;
  avatar: t.Avatar;
  previewAvatar: t.Avatar;
  // queries: t.Query[];
}
interface ConnectedDispatchProps {
  setActiveCharacterCategory(
    category: t.CharacterCategory,
    currentCategory: t.CharacterCategory,
    currentAvatarCostumeValue: t.Id,
  ): void;
  setHoveredEntityId(id: t.Id, category: t.CharacterCategory): void;
  setCostumeCategory(id: t.Id | null, category: t.CharacterCategory): void;
  removeCostumeCategory(costumeId: t.Id, category: t.CharacterCategory): void;
  // updateTitle(id: string, title: string): void;
}
interface ConnectedProps extends ConnectedStateProps, ConnectedDispatchProps {}
interface Props extends Partial<ConnectedProps>, React.ClassAttributes<any> {}

class App extends React.Component<Props> {
  render(): JSX.Element {
    log('render', this);
    const {
      activeCharacterCategory,
      hoveredEntityId,
      avatar,
      previewAvatar,
      // actions
      setActiveCharacterCategory,
      setHoveredEntityId,
      setCostumeCategory,
      removeCostumeCategory,
    } = this.props as ConnectedProps;
    return (
      <div className="App">
        <div className="App-header">
          <h2 style={{display: 'flex', alignItems: 'flex-start'}}>
            {/* TODO clickable-img class, or btn-img, or something similar  */}
            <a
              href="https://github.com/ryanatkn/crawl-dressup"
              style={{opacity: 0.8, marginRight: 10}}
            >
              <img src="assets/github-light.png" />
            </a>
            <div>crawl-dressup</div>
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
                  nimto
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
            <div style={{height: k.tileSize * 2}}>
              <h3 style={{fontWeight: 'normal'}}>settings</h3>
            </div>
          </div>
          <div>
            <div style={{display: 'flex'}}>
              <div
                style={{
                  width: k.tileSize * 2,
                  height: k.tileSize * 2,
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
                  width: k.tileSize * 2,
                  height: k.tileSize * 2,
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
                height: k.tileSize * 2,
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
                <Costume
                  costume={avatar.costume}
                  familiar="left"
                  size={k.renderedTileSizeSm}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                  }}
                />
                <Costume
                  costume={avatar.costume}
                  familiar="right"
                  size={k.renderedTileSize}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                  }}
                />
                <Costume
                  costume={avatar.costume}
                  familiar="left"
                  size={k.renderedTileSizeLg}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                  }}
                />
                <Costume
                  costume={previewAvatar.costume}
                  familiar="right"
                  size={k.renderedTileSizeLg}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                  }}
                />
                <div
                  style={{
                    marginLeft: '10px',
                  }}
                >
                  {/*TODO on click or key={i}, toggle show/hide that category in ui, and displayed toggled status, also display hovered status*/}
                  {k.categoriesOrderedForMenu.map((category, i) =>
                    <div
                      key={category}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight:
                          category === activeCharacterCategory
                            ? 'bold'
                            : 'normal',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        setActiveCharacterCategory(
                          category,
                          activeCharacterCategory,
                          avatar.costume[
                            t.CharacterCategory[activeCharacterCategory]
                          ],
                        )}
                    >
                      <span style={{fontSize: '1.35em'}}>
                        {t.CharacterCategory[category]}
                      </span>
                      <small style={{marginLeft: 10}}>
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
                  <CostumeManager
                    costume={avatar.costume}
                    size={k.renderedTileSizeSm}
                    removeItem={removeCostumeCategory} // TODO this is all super awkward... not using the `costumeId` like it should
                  />
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
                  <h1>
                    {t.CharacterCategory[activeCharacterCategory]}
                  </h1>
                  <small style={{marginLeft: 10}}>
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
                  {playerImages.map(image => {
                    const avatarCostumeItem =
                      avatar.costume[t.CharacterCategory[image.category]];
                    return image.category === activeCharacterCategory
                      ? <div
                          key={image.url}
                          title={image.url}
                          onMouseEnter={() =>
                            setHoveredEntityId(
                              image.id,
                              activeCharacterCategory,
                            )}
                          onClick={() =>
                            setCostumeCategory(
                              image.id,
                              activeCharacterCategory,
                            )}
                          style={{
                            width: k.renderedTileSize,
                            height: k.renderedTileSize,
                            border:
                              avatarCostumeItem &&
                              image.id === avatarCostumeItem.id
                                ? '3px dashed rgba(0, 0, 0, 0.2)'
                                : image.id === hoveredEntityId
                                  ? '3px dashed rgba(0, 0, 0, 0.4)'
                                  : '3px dashed transparent',
                          }}
                        >
                          <Img
                            url={`assets/${image.url}`}
                            size={k.renderedTileSize}
                          />
                        </div>
                      : null;
                  })}
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
  // tslint:disable:no-string-literal
  hoveredEntityId: state.entities['ui'].hoveredEntityId,
  activeCharacterCategory: state.entities['ui'].activeCharacterCategory,
  avatar: state.entities['character'].avatars[0], // TODO
  previewAvatar: state.entities['previewAvatar'],
  // tslint:ensable:no-string-literal
});

const mapDispatchToProps = (dispatch: t.Dispatch): ConnectedDispatchProps => ({
  setActiveCharacterCategory: (
    category: t.CharacterCategory,
    currentCategory: t.CharacterCategory,
    currentAvatarCostumeValue: t.Id,
  ) => {
    // TODO ideally don't need this manual type assertion, need to rewrite Redux type
    dispatch<t.Action>({
      type: t.ActionType.UpdateEntityAction,
      payload: {id: 'ui', key: 'activeCharacterCategory', value: category},
    });
    // TODO this is .. very wrong
    dispatch<t.Action>({
      type: t.ActionType.UpdateEntityAction,
      payload: {
        id: 'previewAvatar',
        key: `costume.${t.CharacterCategory[currentCategory]}`,
        value: currentAvatarCostumeValue,
      },
    });
  },
  // how do we do this correctly? give id automatically to all images? pass index?
  setHoveredEntityId: (id: t.Id, category: t.CharacterCategory) => {
    // TODO ideally don't need this manual type assertion, need to rewrite Redux type
    dispatch<t.Action>({
      type: t.ActionType.UpdateEntityAction,
      payload: {id: 'ui', key: 'hoveredEntityId', value: id}, // TODO 'hoveredEntityId'? or need a stack/collection?
    });
    // TODO... this is really broken
    dispatch<t.Action>({
      type: t.ActionType.UpdateEntityAction,
      payload: {
        id: 'previewAvatar',
        key: `costume.${t.CharacterCategory[category]}`,
        value: id,
      }, // TODO 'hoveredEntityId'? or need a stack/collection?
    });
  },
  // TODO should be the id of the costume itself to prevent nesting
  setCostumeCategory: (id: t.Id | null, category: t.CharacterCategory) => {
    // TODO ideally don't need this manual type assertion, need to rewrite Redux type
    dispatch<t.Action>({
      type: t.ActionType.UpdateEntityAction,
      payload: {
        id: 'character',
        key: `avatars.0.costume.${t.CharacterCategory[category]}`,
        value: id,
      },
    });
  },
  removeCostumeCategory: (costumeId: t.Id, category: t.CharacterCategory) => {
    // TODO not using `costumeId`
    dispatch<t.Action>({
      type: t.ActionType.UpdateEntityAction,
      payload: {
        id: 'character',
        key: `avatars.0.costume.${t.CharacterCategory[category]}`,
        value: null,
      },
    });
    // TODO all hacked up...what's the right way to do this?
    dispatch<t.Action>({
      type: t.ActionType.UpdateEntityAction,
      payload: {
        id: 'previewAvatar',
        key: `costume.${t.CharacterCategory[category]}`,
        value: null,
      },
    });
  },
});

export default (connect(mapStateToProps, mapDispatchToProps)(
  App as any,
) as any) as typeof App; // TODO fix type...how?
