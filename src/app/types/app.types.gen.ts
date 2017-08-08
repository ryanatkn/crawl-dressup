/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../app/defs/app.clay.json
    |> tsTypeWriter
    |> types/app.types.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/

export type Id = string;

export type Json = any[] | object | boolean | number | number | string | null;

export type Path = string;

export interface Entity {id: Id}

export interface ClientState {entities: object}

export interface Character extends Entity {
  name: string;
  avatars: Avatar[];
  activeAvatarId: Id;
}

export interface Avatar extends Entity {costume: Costume}

export interface Costume extends Entity {
  base: Id | null;
  hair: Id | null;
  beard: Id | null;
  body: Id | null;
  legs: Id | null;
  hand1: Id | null;
  hand2: Id | null;
  head: Id | null;
  gloves: Id | null;
  boots: Id | null;
  cloak: Id | null;
  felids: Id | null;
}

export interface DataSource {
  kind: 'sql' | 'mongo';
  id: Id;
  title: string;
  uri: string;
}

export type Query = NewQuery | PendingQuery | RejectedQuery | ResolvedQuery;

export interface NewQuery {
  status: 'new';
  id: Id;
  sourceId: Id;
  title: string;
  raw: string;
  lastExecuted: string | null;
}

export interface PendingQuery {
  status: 'pending';
  id: Id;
  sourceId: Id;
  title: string;
  raw: string;
  lastExecuted: string;
}

export interface RejectedQuery {
  status: 'failed';
  id: Id;
  sourceId: Id;
  title: string;
  raw: string;
  lastExecuted: string;
  error: string;
}

export interface ResolvedQuery {
  status: 'resolved';
  id: Id;
  sourceId: Id;
  title: string;
  raw: string;
  lastExecuted: string;
  results: boolean | null | number | object | string;
}

export interface BaseAction {id?: Id}

export enum ActionType {
  UpdateEntityAction = 'UpdateEntityAction',
  SignUpUserAction = 'SignUpUserAction',
  SignInUserAction = 'SignInUserAction',
  SignOutUserAction = 'SignOutUserAction',
  CreateQueryAction = 'CreateQueryAction',
  ReadQueryAction = 'ReadQueryAction',
  UpdateQueryAction = 'UpdateQueryAction',
  DeleteQueryAction = 'DeleteQueryAction',
  ExecuteQueryAction = 'ExecuteQueryAction',
  ExecuteSuccessQueryAction = 'ExecuteSuccessQueryAction',
  SetActiveQueryAction = 'SetActiveQueryAction',
}

export type Action =
  | UpdateEntityAction
  | SignUpUserAction
  | SignInUserAction
  | SignOutUserAction
  | CreateQueryAction
  | ReadQueryAction
  | UpdateQueryAction
  | DeleteQueryAction
  | ExecuteQueryAction
  | ExecuteSuccessQueryAction
  | SetActiveQueryAction;

export interface UpdateEntityAction extends BaseAction {
  type: ActionType.UpdateEntityAction;
  payload: {id: Id; key: string; value: Json};
}

export interface SignUpUserAction extends BaseAction {
  type: ActionType.SignUpUserAction;
  payload: {email: string};
}

export interface SignInUserAction extends BaseAction {
  type: ActionType.SignInUserAction;
  payload: {email: string; password: string};
}

export interface SignOutUserAction extends BaseAction {
  type: ActionType.SignOutUserAction;
  payload: null;
}

export interface CreateQueryAction extends BaseAction {
  type: ActionType.CreateQueryAction;
  payload: {query: Query};
}

export interface ReadQueryAction extends BaseAction {
  type: ActionType.ReadQueryAction;
  payload: null;
}

export interface UpdateQueryAction extends BaseAction {
  type: ActionType.UpdateQueryAction;
  payload: {id: Id; sourceId?: Id; title?: string; raw?: string};
}

export interface DeleteQueryAction extends BaseAction {
  type: ActionType.DeleteQueryAction;
  payload: {id: Id};
}

export interface ExecuteQueryAction extends BaseAction {
  type: ActionType.ExecuteQueryAction;
  payload: {id: Id};
}

export interface ExecuteSuccessQueryAction extends BaseAction {
  type: ActionType.ExecuteSuccessQueryAction;
  payload: {id: Id; results: string};
}

export interface SetActiveQueryAction extends BaseAction {
  type: ActionType.SetActiveQueryAction;
  payload: {id: Id};
}

export enum CharacterCategory {
  base = 'base',
  hair = 'hair',
  beard = 'beard',
  body = 'body',
  legs = 'legs',
  hand1 = 'hand1',
  hand2 = 'hand2',
  head = 'head',
  gloves = 'gloves',
  boots = 'boots',
  cloak = 'cloak',
  felids = 'felids',
  drcwing = 'drcwing',
  drchead = 'drchead',
  barding = 'barding',
  ench = 'ench',
  halo = 'halo',
  mutations = 'mutations',
  transform = 'transform',
}

export interface ImageData extends Entity {
  url: string;
  parts: string[];
  category: CharacterCategory;
}

export interface BaseMessage {id?: Id}

export enum MessageType {
  InitMessage = 'InitMessage',
  ActionPerformedMessage = 'ActionPerformedMessage',
}

export type Message = InitMessage | ActionPerformedMessage;

export interface InitMessage extends BaseMessage {
  type: MessageType.InitMessage;
  payload: null;
}

export interface ActionPerformedMessage extends BaseMessage {
  type: MessageType.ActionPerformedMessage;
  payload: {action: Action};
}

/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../app/defs/app.clay.json
    |> tsTypeWriter
    |> types/app.types.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/
