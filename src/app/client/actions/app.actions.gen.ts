/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../app/defs/app.clay.json
    |> tsActionWriter
    |> client/actions/app.actions.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/

import * as t from '../types';

export const updateEntity = (
  id: t.Id,
  key: string,
  value: t.Json,
): t.UpdateEntityAction => ({
  type: t.ActionType.UpdateEntityAction,
  payload: {id, key, value},
});

export const signUpUser = (email: string): t.SignUpUserAction => ({
  type: t.ActionType.SignUpUserAction,
  payload: {email},
});

export const signInUser = (
  email: string,
  password: string,
): t.SignInUserAction => ({
  type: t.ActionType.SignInUserAction,
  payload: {email, password},
});

export const signOutUser = (): t.SignOutUserAction => ({
  type: t.ActionType.SignOutUserAction,
  payload: null,
});

export const createQuery = (query: t.Query): t.CreateQueryAction => ({
  type: t.ActionType.CreateQueryAction,
  payload: {query},
});

export const readQuery = (): t.ReadQueryAction => ({
  type: t.ActionType.ReadQueryAction,
  payload: null,
});

export const updateQuery = (
  id: t.Id,
  sourceId?: t.Id,
  title?: string,
  raw?: string,
): t.UpdateQueryAction => ({
  type: t.ActionType.UpdateQueryAction,
  payload: {id, sourceId, title, raw},
});

export const deleteQuery = (id: t.Id): t.DeleteQueryAction => ({
  type: t.ActionType.DeleteQueryAction,
  payload: {id},
});

export const executeQuery = (id: t.Id): t.ExecuteQueryAction => ({
  type: t.ActionType.ExecuteQueryAction,
  payload: {id},
});

export const executeSuccessQuery = (
  id: t.Id,
  results: string,
): t.ExecuteSuccessQueryAction => ({
  type: t.ActionType.ExecuteSuccessQueryAction,
  payload: {id, results},
});

export const setActiveQuery = (id: t.Id): t.SetActiveQueryAction => ({
  type: t.ActionType.SetActiveQueryAction,
  payload: {id},
});

/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../app/defs/app.clay.json
    |> tsActionWriter
    |> client/actions/app.actions.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/
