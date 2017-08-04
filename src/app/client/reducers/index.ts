import * as assets from '../../../assets';
import * as rand from '../../../utils/rand';
import * as t from '../types';

// TODO move this
// TODO key these by an entity id so they can be referred to
export const playerImages: t.ImageData[] = assets.images
  .filter(image => image.indexOf('dcss/player/') === 0)
  .map(image => {
    const parts = image.split('/');
    const category = t.CharacterCategory[parts[2]];
    return {
      id: rand.id(),
      url: image,
      parts,
      category,
    };
  });

// TODO move this and `playerImages`
export const playerImagesById: Dict<
  t.ImageData
> = playerImages.reduce((result, image) => {
  result[image.id!] = image;
  return result;
}, {});

// TODO genme
export const getDefaultState = (): t.ClientState => {
  const sources: t.DataSource[] = [
    {
      id: rand.id(),
      kind: 'sql',
      uri: 'sqlite-db',
      title: 'sqlite-db local',
    },
    {
      id: rand.id(),
      kind: 'mongo', // TODO need to switch Monaco language based on connection info (and show parse errors, so it should be obvious if you have an incompatible source selected)
      uri: 'mongodb://localhost:3003',
      title: 'mongodb localhost',
    },
  ];
  const queries: t.Query[] = [
    {
      id: rand.id(),
      status: 'new',
      title: 'get queries',
      raw: 'SELECT * FROM query',
      sourceId: sources[0].id,
      lastExecuted: null,
    },
    {
      id: rand.id(),
      status: 'new',
      title: 'get users',
      raw: 'db.users.find({})',
      sourceId: sources[1].id,
      lastExecuted: null,
    },
  ];
  const costume = {
    id: rand.id(),
    base: playerImages.find(i => i.category === t.CharacterCategory.base)!.id,
    hair: null,
    beard: null,
    body: null,
    legs: null,
    hand1: null,
    hand2: null,
    head: null,
    gloves: null,
    boots: null,
    cloak: null,
    felids: playerImages.find(i => i.category === t.CharacterCategory.felids)!
      .id,
  };
  return {
    entities: {
      // TODO unite with entity ids and paths
      ui: {
        hoveredEntityId: null,
        activeCharacterCategory: t.CharacterCategory.base,
      },
      queries,
      sources,
      activeQueryId: (queries[0] && queries[0].id) || null,
      character: {
        id: rand.id(),
        name: 'Nimto',
        avatars: [
          {
            id: rand.id(),
            // TODO this is all janky
            costume,
          },
        ],
      },
      previewAvatar: {
        id: rand.id(),
        costume: {
          ...costume,
          id: rand.id(),
        },
      },
    },
  };
};

export const getNextActiveQueryId = (
  state: t.ClientState,
  oldId: string,
): string | null => {
  if (state.entities['activeQueryId'] === oldId) {
    const next = state.entities['queries'].find((q: t.Query) => q.id !== oldId);
    return next ? next.id : null;
  } else {
    return state.entities['activeQueryId'];
  }
};

// TODO refactor and gen
export const reducer = (
  state: t.ClientState = getDefaultState(),
  action: t.Action,
): t.ClientState => {
  switch (action.type) {
    case t.ActionType.SignUpUserAction: {
      return {
        ...state,
      };
    }
    case t.ActionType.SignInUserAction: {
      return {
        ...state,
      };
    }
    case t.ActionType.SignOutUserAction: {
      return {
        ...state,
      };
    }
    case t.ActionType.CreateQueryAction: {
      return {
        ...state,
        entities: {
          ...state.entities,
          queries: state.entities['queries'].concat(action.payload.query),
        },
      };
    }
    case t.ActionType.ReadQueryAction: {
      return {
        ...state,
      };
    }
    case t.ActionType.UpdateQueryAction: {
      const {id, ...update} = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          queries: state.entities['queries'].map(
            (q: t.Query) =>
              q.id === id
                ? {
                    ...q,
                    ...update as any, // TODO problem here is that copying an obj with optional properties makes invalid `undefined` copied in type system, which is not what should be expressed
                  }
                : q,
          ),
        },
      };
    }
    case t.ActionType.DeleteQueryAction: {
      const {id} = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          queries: state.entities['queries'].filter(
            (q: t.Query) => q.id !== id,
          ),
          activeQueryId: getNextActiveQueryId(state, id),
        },
      };
    }
    case t.ActionType.ExecuteQueryAction: {
      const {id} = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          queries: state.entities['queries'].map(
            (q: t.Query) =>
              q.id === id
                ? {
                    ...q,
                    lastExecuted: q.raw,
                  }
                : q,
          ),
        },
      };
    }
    case t.ActionType.ExecuteSuccessQueryAction: {
      const {id, results} = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          queries: state.entities['queries'].map(
            (q: t.ResolvedQuery) =>
              q.id === id
                ? {
                    ...q,
                    results,
                    status: 'resolved' as 'resolved', // tslint:disable-line:no-unnecessary-type-assertion // TODO bug
                  }
                : q,
          ),
        },
      };
    }
    case t.ActionType.SetActiveQueryAction: {
      return {
        ...state,
        entities: {
          ...state.entities,
          activeQueryId: action.payload.id,
        },
      };
    }
    case t.ActionType.UpdateEntityAction: {
      // TODO support arbitrary keyPath length (immutable.js?)
      const keyPath = action.payload.key.split('.');
      if (keyPath.length === 1) {
        return {
          ...state,
          entities: {
            ...state.entities,
            [action.payload.id]: {
              ...state.entities[action.payload.id],
              [action.payload.key]: action.payload.value,
            },
          },
        };
      } else if (keyPath.length === 2) {
        return {
          ...state,
          entities: {
            ...state.entities,
            [action.payload.id]: {
              ...state.entities[action.payload.id],
              [keyPath[0]]: {
                ...state.entities[action.payload.id][keyPath[0]],
                [keyPath[1]]: action.payload.value,
              },
            },
          },
        };
      } else if (keyPath.length === 3) {
        return {
          ...state,
          entities: {
            ...state.entities,
            [action.payload.id]: {
              ...state.entities[action.payload.id],
              [keyPath[0]]: {
                ...state.entities[action.payload.id][keyPath[0]],
                [keyPath[1]]: {
                  ...state.entities[action.payload.id][keyPath[0]][keyPath[1]],
                  [keyPath[2]]: action.payload.value,
                },
              },
            },
          },
        };
      } else if (keyPath.length === 4) {
        return {
          ...state,
          entities: {
            ...state.entities,
            [action.payload.id]: {
              ...state.entities[action.payload.id],
              [keyPath[0]]: {
                ...state.entities[action.payload.id][keyPath[0]],
                [keyPath[1]]: {
                  ...state.entities[action.payload.id][keyPath[0]][keyPath[1]],
                  [keyPath[2]]: {
                    ...state.entities[action.payload.id][keyPath[0]][
                      keyPath[1]
                    ][keyPath[2]],
                    [keyPath[3]]: action.payload.value,
                  },
                },
              },
            },
          },
        };
      } else {
        throw new Error(`Unsupported key path ${action.payload.key}`);
      }
    }
    default:
      t.is<never>(action);
      return state;
  }
};
