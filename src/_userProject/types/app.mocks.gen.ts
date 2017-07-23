/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../_userProject/defs/app.def.json
    |> tsMockWriter
    |> types/app.mocks.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/

import {sample} from 'lodash';

import * as rand from '../../utils/rand';
import * as t from '../types';

export const mockId = (): t.Id => rand.id();

export const mockClientState = (): t.ClientState => ({
  sources: [],
  queries: [],
  activeQueryId: sample([rand.str(), null]) as string | null,
});

export const mockDataSource = (): t.DataSource => ({
  kind: sample(['sql', 'mongo']) as 'sql' | 'mongo',
  id: t.mockId(),
  title: rand.str(),
  uri: rand.str(),
});

export const mockQuery = (): t.Query =>
  sample([
    t.mockNewQuery(),
    t.mockPendingQuery(),
    t.mockRejectedQuery(),
    t.mockResolvedQuery(),
  ]) as t.Query;

export const mockNewQuery = (): t.NewQuery => ({
  status: 'new',
  id: t.mockId(),
  sourceId: t.mockId(),
  title: rand.str(),
  raw: rand.str(),
  lastExecuted: sample([rand.str(), null]) as string | null,
});

export const mockPendingQuery = (): t.PendingQuery => ({
  status: 'pending',
  id: t.mockId(),
  sourceId: t.mockId(),
  title: rand.str(),
  raw: rand.str(),
  lastExecuted: rand.str(),
});

export const mockRejectedQuery = (): t.RejectedQuery => ({
  status: 'failed',
  id: t.mockId(),
  sourceId: t.mockId(),
  title: rand.str(),
  raw: rand.str(),
  lastExecuted: rand.str(),
  error: rand.str(),
});

export const mockResolvedQuery = (): t.ResolvedQuery => ({
  status: 'resolved',
  id: t.mockId(),
  sourceId: t.mockId(),
  title: rand.str(),
  raw: rand.str(),
  lastExecuted: rand.str(),
  results: sample([
    sample([true, false]) as boolean,
    null,
    rand.num(),
    {},
    rand.str(),
  ]) as boolean | null | number | {} | string,
});

export const mockBaseAction = (): t.BaseAction => ({
  id: t.mockId(),
});

export const mockActionType = (): t.ActionType =>
  sample([
    t.ActionType.SignUpUserAction,
    t.ActionType.SignInUserAction,
    t.ActionType.SignOutUserAction,
    t.ActionType.CreateQueryAction,
    t.ActionType.ReadQueryAction,
    t.ActionType.UpdateQueryAction,
    t.ActionType.DeleteQueryAction,
    t.ActionType.ExecuteQueryAction,
    t.ActionType.ExecuteSuccessQueryAction,
    t.ActionType.SetActiveQueryAction,
  ]) as t.ActionType;

export const mockAction = (): t.Action =>
  sample([
    t.mockSignUpUserAction(),
    t.mockSignInUserAction(),
    t.mockSignOutUserAction(),
    t.mockCreateQueryAction(),
    t.mockReadQueryAction(),
    t.mockUpdateQueryAction(),
    t.mockDeleteQueryAction(),
    t.mockExecuteQueryAction(),
    t.mockExecuteSuccessQueryAction(),
    t.mockSetActiveQueryAction(),
  ]) as t.Action;

export const mockSignUpUserAction = (): t.SignUpUserAction => ({
  type: t.ActionType.SignUpUserAction,
  payload: {
    email: rand.str(),
  },
});

export const mockSignInUserAction = (): t.SignInUserAction => ({
  type: t.ActionType.SignInUserAction,
  payload: {
    email: rand.str(),
    password: rand.str(),
  },
});

export const mockSignOutUserAction = (): t.SignOutUserAction => ({
  type: t.ActionType.SignOutUserAction,
  payload: null,
});

export const mockCreateQueryAction = (): t.CreateQueryAction => ({
  type: t.ActionType.CreateQueryAction,
  payload: {
    query: t.mockQuery(),
  },
});

export const mockReadQueryAction = (): t.ReadQueryAction => ({
  type: t.ActionType.ReadQueryAction,
  payload: null,
});

export const mockUpdateQueryAction = (): t.UpdateQueryAction => ({
  type: t.ActionType.UpdateQueryAction,
  payload: {
    id: t.mockId(),
    sourceId: t.mockId(),
    title: rand.str(),
    raw: rand.str(),
  },
});

export const mockDeleteQueryAction = (): t.DeleteQueryAction => ({
  type: t.ActionType.DeleteQueryAction,
  payload: {
    id: t.mockId(),
  },
});

export const mockExecuteQueryAction = (): t.ExecuteQueryAction => ({
  type: t.ActionType.ExecuteQueryAction,
  payload: {
    id: t.mockId(),
  },
});

export const mockExecuteSuccessQueryAction = (): t.ExecuteSuccessQueryAction => ({
  type: t.ActionType.ExecuteSuccessQueryAction,
  payload: {
    id: t.mockId(),
    results: rand.str(),
  },
});

export const mockSetActiveQueryAction = (): t.SetActiveQueryAction => ({
  type: t.ActionType.SetActiveQueryAction,
  payload: {
    id: t.mockId(),
  },
});

export const mockBaseMessage = (): t.BaseMessage => ({
  id: t.mockId(),
});

export const mockMessageType = (): t.MessageType =>
  sample([
    t.MessageType.InitMessage,
    t.MessageType.ActionPerformedMessage,
  ]) as t.MessageType;

export const mockMessage = (): t.Message =>
  sample([t.mockInitMessage(), t.mockActionPerformedMessage()]) as t.Message;

export const mockInitMessage = (): t.InitMessage => ({
  type: t.MessageType.InitMessage,
  payload: null,
});

export const mockActionPerformedMessage = (): t.ActionPerformedMessage => ({
  type: t.MessageType.ActionPerformedMessage,
  payload: {
    action: t.mockAction(),
  },
});

/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../_userProject/defs/app.def.json
    |> tsMockWriter
    |> types/app.mocks.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/
