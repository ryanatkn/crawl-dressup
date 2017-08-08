/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../app/defs/app.clay.json
    |> tsMockWriter
    |> types/app.mocks.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/

import {sample} from 'lodash';

import * as rand from '../../utils/rand';
import * as t from '../types';

export const mockId = (): t.Id => rand.str(26, 26);

export const mockJson = (): t.Json =>
  sample([
    [],
    {},
    sample([true, false]) as boolean,
    rand.num(),
    rand.int(),
    rand.str(),
    null,
  ]) as t.Json;

export const mockPath = (): t.Path => rand.str();

export const mockEntity = (): t.Entity => ({id: t.mockId()});

export const mockClientState = (): t.ClientState => ({entities: {}});

export const mockCharacter = (): t.Character => ({
  id: t.mockId(),
  name: rand.str(),
  avatars: [],
  activeAvatarId: t.mockId(),
});

export const mockAvatar = (): t.Avatar => ({
  id: t.mockId(),
  costume: t.mockCostume(),
});

export const mockCostume = (): t.Costume => ({
  id: t.mockId(),
  base: sample([t.mockId(), null]) as t.Id | null,
  hair: sample([t.mockId(), null]) as t.Id | null,
  beard: sample([t.mockId(), null]) as t.Id | null,
  body: sample([t.mockId(), null]) as t.Id | null,
  legs: sample([t.mockId(), null]) as t.Id | null,
  hand1: sample([t.mockId(), null]) as t.Id | null,
  hand2: sample([t.mockId(), null]) as t.Id | null,
  head: sample([t.mockId(), null]) as t.Id | null,
  gloves: sample([t.mockId(), null]) as t.Id | null,
  boots: sample([t.mockId(), null]) as t.Id | null,
  cloak: sample([t.mockId(), null]) as t.Id | null,
  felids: sample([t.mockId(), null]) as t.Id | null,
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
  ]) as boolean | null | number | object | string,
});

export const mockBaseAction = (): t.BaseAction => ({id: t.mockId()});

export const mockActionType = (): t.ActionType =>
  sample([
    t.ActionType.UpdateEntityAction,
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
    t.mockUpdateEntityAction(),
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

export const mockUpdateEntityAction = (): t.UpdateEntityAction => ({
  id: t.mockId(),
  type: t.ActionType.UpdateEntityAction,
  payload: {id: t.mockId(), key: rand.str(), value: t.mockJson()},
});

export const mockSignUpUserAction = (): t.SignUpUserAction => ({
  id: t.mockId(),
  type: t.ActionType.SignUpUserAction,
  payload: {email: rand.str()},
});

export const mockSignInUserAction = (): t.SignInUserAction => ({
  id: t.mockId(),
  type: t.ActionType.SignInUserAction,
  payload: {email: rand.str(), password: rand.str()},
});

export const mockSignOutUserAction = (): t.SignOutUserAction => ({
  id: t.mockId(),
  type: t.ActionType.SignOutUserAction,
  payload: null,
});

export const mockCreateQueryAction = (): t.CreateQueryAction => ({
  id: t.mockId(),
  type: t.ActionType.CreateQueryAction,
  payload: {query: t.mockQuery()},
});

export const mockReadQueryAction = (): t.ReadQueryAction => ({
  id: t.mockId(),
  type: t.ActionType.ReadQueryAction,
  payload: null,
});

export const mockUpdateQueryAction = (): t.UpdateQueryAction => ({
  id: t.mockId(),
  type: t.ActionType.UpdateQueryAction,
  payload: {
    id: t.mockId(),
    sourceId: t.mockId(),
    title: rand.str(),
    raw: rand.str(),
  },
});

export const mockDeleteQueryAction = (): t.DeleteQueryAction => ({
  id: t.mockId(),
  type: t.ActionType.DeleteQueryAction,
  payload: {id: t.mockId()},
});

export const mockExecuteQueryAction = (): t.ExecuteQueryAction => ({
  id: t.mockId(),
  type: t.ActionType.ExecuteQueryAction,
  payload: {id: t.mockId()},
});

export const mockExecuteSuccessQueryAction = (): t.ExecuteSuccessQueryAction => ({
  id: t.mockId(),
  type: t.ActionType.ExecuteSuccessQueryAction,
  payload: {id: t.mockId(), results: rand.str()},
});

export const mockSetActiveQueryAction = (): t.SetActiveQueryAction => ({
  id: t.mockId(),
  type: t.ActionType.SetActiveQueryAction,
  payload: {id: t.mockId()},
});

export const mockCharacterCategory = (): t.CharacterCategory =>
  sample([
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
    t.CharacterCategory.drcwing,
    t.CharacterCategory.drchead,
    t.CharacterCategory.barding,
    t.CharacterCategory.ench,
    t.CharacterCategory.halo,
    t.CharacterCategory.mutations,
    t.CharacterCategory.transform,
  ]) as t.CharacterCategory;

export const mockImageData = (): t.ImageData => ({
  id: t.mockId(),
  url: rand.str(),
  parts: [],
  category: t.mockCharacterCategory(),
});

export const mockBaseMessage = (): t.BaseMessage => ({id: t.mockId()});

export const mockMessageType = (): t.MessageType =>
  sample([
    t.MessageType.InitMessage,
    t.MessageType.ActionPerformedMessage,
  ]) as t.MessageType;

export const mockMessage = (): t.Message =>
  sample([t.mockInitMessage(), t.mockActionPerformedMessage()]) as t.Message;

export const mockInitMessage = (): t.InitMessage => ({
  id: t.mockId(),
  type: t.MessageType.InitMessage,
  payload: null,
});

export const mockActionPerformedMessage = (): t.ActionPerformedMessage => ({
  id: t.mockId(),
  type: t.MessageType.ActionPerformedMessage,
  payload: {action: t.mockAction()},
});

/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../app/defs/app.clay.json
    |> tsMockWriter
    |> types/app.mocks.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/
