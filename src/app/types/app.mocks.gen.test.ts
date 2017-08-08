/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../app/defs/app.clay.json
    |> tsMockTestWriter
    |> types/app.mocks.gen.test.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/

import * as Ajv from 'ajv';

import * as t from '../types';
import * as mocks from './app.mocks.gen';
import {clay} from '../defs/app.clay.gen';

/* tslint:disable:no-console */

const ajv = new Ajv();
for (const d in clay.definitions) {
  ajv.addSchema(clay.definitions[d]);
}

it('mock def "Id"', () => {
  const m = mocks.mockId();
  t.is<t.Id>(m);
  const v = ajv.validate('Id', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "Json"', () => {
  const m = mocks.mockJson();
  t.is<t.Json>(m);
  const v = ajv.validate('Json', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "Path"', () => {
  const m = mocks.mockPath();
  t.is<t.Path>(m);
  const v = ajv.validate('Path', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "Entity"', () => {
  const m = mocks.mockEntity();
  t.is<t.Entity>(m);
  const v = ajv.validate('Entity', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "ClientState"', () => {
  const m = mocks.mockClientState();
  t.is<t.ClientState>(m);
  const v = ajv.validate('ClientState', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "Character"', () => {
  const m = mocks.mockCharacter();
  t.is<t.Character>(m);
  const v = ajv.validate('Character', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "Avatar"', () => {
  const m = mocks.mockAvatar();
  t.is<t.Avatar>(m);
  const v = ajv.validate('Avatar', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "Costume"', () => {
  const m = mocks.mockCostume();
  t.is<t.Costume>(m);
  const v = ajv.validate('Costume', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "DataSource"', () => {
  const m = mocks.mockDataSource();
  t.is<t.DataSource>(m);
  const v = ajv.validate('DataSource', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "Query"', () => {
  const m = mocks.mockQuery();
  t.is<t.Query>(m);
  const v = ajv.validate('Query', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "NewQuery"', () => {
  const m = mocks.mockNewQuery();
  t.is<t.NewQuery>(m);
  const v = ajv.validate('NewQuery', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "PendingQuery"', () => {
  const m = mocks.mockPendingQuery();
  t.is<t.PendingQuery>(m);
  const v = ajv.validate('PendingQuery', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "RejectedQuery"', () => {
  const m = mocks.mockRejectedQuery();
  t.is<t.RejectedQuery>(m);
  const v = ajv.validate('RejectedQuery', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "ResolvedQuery"', () => {
  const m = mocks.mockResolvedQuery();
  t.is<t.ResolvedQuery>(m);
  const v = ajv.validate('ResolvedQuery', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "BaseAction"', () => {
  const m = mocks.mockBaseAction();
  t.is<t.BaseAction>(m);
  const v = ajv.validate('BaseAction', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "ActionType"', () => {
  const m = mocks.mockActionType();
  t.is<t.ActionType>(m);
  const v = ajv.validate('ActionType', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "Action"', () => {
  const m = mocks.mockAction();
  t.is<t.Action>(m);
  const v = ajv.validate('Action', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "UpdateEntityAction"', () => {
  const m = mocks.mockUpdateEntityAction();
  t.is<t.UpdateEntityAction>(m);
  const v = ajv.validate('UpdateEntityAction', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "SignUpUserAction"', () => {
  const m = mocks.mockSignUpUserAction();
  t.is<t.SignUpUserAction>(m);
  const v = ajv.validate('SignUpUserAction', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "SignInUserAction"', () => {
  const m = mocks.mockSignInUserAction();
  t.is<t.SignInUserAction>(m);
  const v = ajv.validate('SignInUserAction', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "SignOutUserAction"', () => {
  const m = mocks.mockSignOutUserAction();
  t.is<t.SignOutUserAction>(m);
  const v = ajv.validate('SignOutUserAction', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "CreateQueryAction"', () => {
  const m = mocks.mockCreateQueryAction();
  t.is<t.CreateQueryAction>(m);
  const v = ajv.validate('CreateQueryAction', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "ReadQueryAction"', () => {
  const m = mocks.mockReadQueryAction();
  t.is<t.ReadQueryAction>(m);
  const v = ajv.validate('ReadQueryAction', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "UpdateQueryAction"', () => {
  const m = mocks.mockUpdateQueryAction();
  t.is<t.UpdateQueryAction>(m);
  const v = ajv.validate('UpdateQueryAction', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "DeleteQueryAction"', () => {
  const m = mocks.mockDeleteQueryAction();
  t.is<t.DeleteQueryAction>(m);
  const v = ajv.validate('DeleteQueryAction', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "ExecuteQueryAction"', () => {
  const m = mocks.mockExecuteQueryAction();
  t.is<t.ExecuteQueryAction>(m);
  const v = ajv.validate('ExecuteQueryAction', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "ExecuteSuccessQueryAction"', () => {
  const m = mocks.mockExecuteSuccessQueryAction();
  t.is<t.ExecuteSuccessQueryAction>(m);
  const v = ajv.validate('ExecuteSuccessQueryAction', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "SetActiveQueryAction"', () => {
  const m = mocks.mockSetActiveQueryAction();
  t.is<t.SetActiveQueryAction>(m);
  const v = ajv.validate('SetActiveQueryAction', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "CharacterCategory"', () => {
  const m = mocks.mockCharacterCategory();
  t.is<t.CharacterCategory>(m);
  const v = ajv.validate('CharacterCategory', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "ImageData"', () => {
  const m = mocks.mockImageData();
  t.is<t.ImageData>(m);
  const v = ajv.validate('ImageData', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "BaseMessage"', () => {
  const m = mocks.mockBaseMessage();
  t.is<t.BaseMessage>(m);
  const v = ajv.validate('BaseMessage', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "MessageType"', () => {
  const m = mocks.mockMessageType();
  t.is<t.MessageType>(m);
  const v = ajv.validate('MessageType', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "Message"', () => {
  const m = mocks.mockMessage();
  t.is<t.Message>(m);
  const v = ajv.validate('Message', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "InitMessage"', () => {
  const m = mocks.mockInitMessage();
  t.is<t.InitMessage>(m);
  const v = ajv.validate('InitMessage', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

it('mock def "ActionPerformedMessage"', () => {
  const m = mocks.mockActionPerformedMessage();
  t.is<t.ActionPerformedMessage>(m);
  const v = ajv.validate('ActionPerformedMessage', m);
  expect(ajv.errors).toBeNull();
  expect(v).toBeTruthy();
});

/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../app/defs/app.clay.json
    |> tsMockTestWriter
    |> types/app.mocks.gen.test.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/
