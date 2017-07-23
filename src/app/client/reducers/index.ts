import * as rand from '../../../utils/rand';
import * as t from '../types';

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
  return {
    queries,
    sources,
    activeQueryId: (queries[0] && queries[0].id) || null,
  };
};

export const getNextActiveQueryId = (
  state: t.ClientState,
  oldId: string,
): string | null => {
  if (state.activeQueryId === oldId) {
    const next = state.queries.find(q => q.id !== oldId);
    return next ? next.id : null;
  } else {
    return state.activeQueryId;
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
        queries: state.queries.concat(action.payload.query),
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
        queries: state.queries.map(
          q =>
            q.id === id
              ? {
                  ...q,
                  ...update as any, // TODO problem here is that copying an obj with optional properties makes invalid `undefined` copied in type system, which is not what should be expressed
                }
              : q,
        ),
      };
    }
    case t.ActionType.DeleteQueryAction: {
      const {id} = action.payload;
      return {
        ...state,
        queries: state.queries.filter(q => q.id !== id),
        activeQueryId: getNextActiveQueryId(state, id),
      };
    }
    case t.ActionType.ExecuteQueryAction: {
      const {id} = action.payload;
      return {
        ...state,
        queries: state.queries.map(
          q =>
            q.id === id
              ? {
                  ...q,
                  lastExecuted: q.raw,
                }
              : q,
        ),
      };
    }
    case t.ActionType.ExecuteSuccessQueryAction: {
      const {id, results} = action.payload;
      return {
        ...state,
        queries: state.queries.map(
          (q: t.ResolvedQuery) =>
            q.id === id
              ? {
                  ...q,
                  results,
                  status: 'resolved' as 'resolved', // tslint:disable-line:no-unnecessary-type-assertion // TODO bug
                }
              : q,
        ),
      };
    }
    case t.ActionType.SetActiveQueryAction: {
      return {
        ...state,
        activeQueryId: action.payload.id,
      };
    }
    default:
      t.is<never>(action);
      return state;
  }
};
