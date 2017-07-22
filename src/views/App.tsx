import './App.css';

import * as React from 'react';
import * as assets from '../assets';
import * as t from '../types';

import {Frame} from './Frame';
import {Img} from './Img';
import {connect} from 'react-redux';
import {logger} from '../utils/logger';
import {uniq} from 'lodash';

const dbg = logger('App', {count: ['render']});

const tileSize = 32; // TODO
const renderedTileSize = tileSize * 4; // TODO
const renderedTileSizeLg = renderedTileSize * 2; // TODO

interface ImageData {
  url: string;
  parts: string[];
  category: string;
}

const playerImages: ImageData[] = assets.images
  .filter(image => image.indexOf('/dcss/player/') === 0)
  .map(image => {
    const parts = image.split('/');
    const category = parts[3];
    return {
      url: image,
      parts,
      category,
    };
  });

const categoryOrder = [
  'base',
  'hair',
  'beard',
  'body',
  'legs',
  'hand1',
  'hand2',
  'head',
  'gloves',
  'boots',
  'cloak',
  'felids',
  'drcwing',
  'drchead',
];

const omittedCategories = ['barding', 'ench', 'halo', 'mutations', 'transform'];

// TODO move this and the above code
const categories = uniq(playerImages.map(i => i.category))
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
  // queries: t.Query[];
}
interface ConnectedDispatchProps {
  // updateTitle(id: string, title: string): void;
}
interface ConnectedProps extends ConnectedStateProps, ConnectedDispatchProps {}
interface Props extends Partial<ConnectedProps>, React.ClassAttributes<any> {}

class App extends React.Component<Props> {
  render(): JSX.Element {
    dbg('render', this);
    // const {
    //   queries,
    // } = this.props as ConnectedProps;
    return (
      <div className="App">
        <div className="App-header">
          <h2>enti</h2>
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
                    <div key={category}>
                      <small>{i}</small> {category}
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
                {categories.map(category =>
                  <div key={category}>
                    <div>
                      {category}
                      {' - '}
                      <small>
                        {playerImages.reduce(
                          (count, image) =>
                            image.category === category ? count + 1 : count,
                          0,
                        )}
                      </small>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                      {playerImages.map(
                        image =>
                          image.category === category
                            ? <div key={image.url} title={image.url}>
                                <Img
                                  src={`assets/${image.url}`}
                                  size={renderedTileSize}
                                />
                              </div>
                            : null,
                      )}
                    </div>
                  </div>,
                )}
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
});

const mapDispatchToProps = (dispatch: t.Dispatch): ConnectedDispatchProps => ({
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
