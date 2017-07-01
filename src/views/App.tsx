import * as React from 'react';
import {connect} from 'react-redux';

import * as rand from '../utils/rand';
import * as t from '../types';
import {logger} from '../utils/logger';

import {Frame} from './Frame';
import {QueryList} from './QueryList';
import {QueryEditor} from './QueryEditor';
import {QueryResults} from './QueryResults';

import './App.css';

const dbg = logger('App', {count: ['render']});

interface ConnectedStateProps {
  queries: t.Query[];
  sources: t.DataSource[];
  activeQuery: t.Query | undefined;
}
interface ConnectedDispatchProps {
  updateTitle(id: string, title: string): void;
  updateRaw(id: string, raw: string): void;
  updateSourceId(id: string, sourceId: string): void;
  createQuery(): void; // TODO generate special type for doc of initial properties
  deleteQuery(id: string): void;
  executeQuery(id: string): void;
  setActiveQuery(id: string): void;
}
interface ConnectedProps extends ConnectedStateProps, ConnectedDispatchProps {}
interface Props extends Partial<ConnectedProps>, React.ClassAttributes<any> {}

class App extends React.Component<Props> {
  render(): JSX.Element {
    dbg('render', this, this.props.activeQuery);
    const {
      queries,
      sources,
      activeQuery,
      updateTitle,
      updateRaw,
      updateSourceId,
      createQuery,
      deleteQuery,
      executeQuery,
      setActiveQuery,
    } = this.props as ConnectedProps;
    return (
      <div className="App">
        <div className="App-header">
          <h2>dbslate</h2>
        </div>
        <div className="App-frames" style={{padding: '8px'}}>
          <Frame>
            <div style={{flex: '1', display: 'flex', flexAlign: 'stretch'}}>
              <div
                style={{
                  width: 400,
                  overflow: 'auto',
                }}
              >
                <QueryList
                  queries={queries}
                  createQuery={createQuery}
                  setActiveQuery={setActiveQuery}
                  activeQuery={activeQuery}
                />
              </div>
              <div
                style={{
                  flex: '1',
                  overflow: 'auto',
                }}
              >
                {activeQuery
                  ? <div>
                      <QueryEditor
                        query={activeQuery}
                        sources={sources}
                        updateTitle={updateTitle}
                        updateRaw={updateRaw}
                        updateSourceId={updateSourceId}
                      />
                      <QueryResults
                        query={activeQuery}
                        executeQuery={executeQuery}
                        deleteQuery={deleteQuery}
                      />

                    </div>
                  : <div>
                      create a
                      {' '}
                      <button onClick={this.doCreateQuery}>
                        new query
                      </button>
                      {' '}
                      to get started
                    </div>}
              </div>
            </div>
          </Frame>
        </div>
      </div>
    );
  }

  doCreateQuery = () => {
    if (this.props.createQuery) {
      this.props.createQuery();
    }
  };
}

const mapStateToProps = (state: t.ClientState): ConnectedStateProps => ({
  queries: state.queries,
  sources: state.sources,
  // TODO make this a selector
  activeQuery: state.queries.find(q => q.id === state.activeQueryId), // tslint:disable-line:no-non-null-assertion
});

const mapDispatchToProps = (dispatch: t.Dispatch): ConnectedDispatchProps => ({
  updateTitle: (
    id: string,
    title: string, // TODO unify by making generic? update doc type?
  ) =>
    dispatch<t.Action>({
      type: t.ActionType.UpdateQueryAction,
      payload: {id, title},
    }),
  updateRaw: (
    id: string,
    raw: string, // TODO unify by making generic? update doc type?
  ) =>
    dispatch<t.Action>({
      type: t.ActionType.UpdateQueryAction,
      payload: {id, raw},
    }),
  updateSourceId: (
    id: string,
    sourceId: string, // TODO unify by making generic? update doc type?
  ) =>
    dispatch<t.Action>({
      type: t.ActionType.UpdateQueryAction,
      payload: {id, sourceId},
    }),
  createQuery: () => {
    const query: t.Query = {
      status: 'new',
      id: rand.id(), // TODO must be done by server
      sourceId: '',
      title: '',
      raw: '',
      lastExecuted: null,
    };
    dispatch<t.Action>({
      type: t.ActionType.CreateQueryAction,
      payload: {query},
    });
    dispatch<t.Action>({
      type: t.ActionType.SetActiveQueryAction,
      payload: {id: query.id},
    });
  },
  deleteQuery: (id: string) =>
    dispatch<t.Action>({type: t.ActionType.DeleteQueryAction, payload: {id}}),
  executeQuery: (id: string) => {
    dispatch<t.Action>({type: t.ActionType.ExecuteQueryAction, payload: {id}});
    // TODO hook into api server
    dispatch<t.Action>({
      type: t.ActionType.ExecuteSuccessQueryAction,
      payload: {id, results: `ts:${Date.now()}`},
    });
  },
  setActiveQuery: (id: string) =>
    dispatch<t.Action>({
      type: t.ActionType.SetActiveQueryAction,
      payload: {id},
    }),
});

export default (connect(mapStateToProps, mapDispatchToProps)(
  App as any,
) as any) as typeof App; // TODO fix type...how?
