/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../_userProject/defs/app.def.json
    |> tsTypeWriter
    |> types/app.types.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/

export type Id = string;

export interface ClientState {
  sources: DataSource[];
  queries: Query[];
  activeQueryId: string | null;
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
  results: boolean | null | number | {} | string;
}

export interface BaseAction {
  id?: Id;
}

export enum ActionType {
  SignUpUserAction,
  SignInUserAction,
  SignOutUserAction,
  CreateQueryAction,
  ReadQueryAction,
  UpdateQueryAction,
  DeleteQueryAction,
  ExecuteQueryAction,
  ExecuteSuccessQueryAction,
  SetActiveQueryAction,
}

export type Action =
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

export interface SignUpUserAction extends BaseAction {
  type: ActionType.SignUpUserAction;
  payload: {
    email: string;
  };
}

export interface SignInUserAction extends BaseAction {
  type: ActionType.SignInUserAction;
  payload: {
    email: string;
    password: string;
  };
}

export interface SignOutUserAction extends BaseAction {
  type: ActionType.SignOutUserAction;
  payload: null;
}

export interface CreateQueryAction extends BaseAction {
  type: ActionType.CreateQueryAction;
  payload: {
    query: Query;
  };
}

export interface ReadQueryAction extends BaseAction {
  type: ActionType.ReadQueryAction;
  payload: null;
}

export interface UpdateQueryAction extends BaseAction {
  type: ActionType.UpdateQueryAction;
  payload: {
    id: Id;
    sourceId?: Id;
    title?: string;
    raw?: string;
  };
}

export interface DeleteQueryAction extends BaseAction {
  type: ActionType.DeleteQueryAction;
  payload: {
    id: Id;
  };
}

export interface ExecuteQueryAction extends BaseAction {
  type: ActionType.ExecuteQueryAction;
  payload: {
    id: Id;
  };
}

export interface ExecuteSuccessQueryAction extends BaseAction {
  type: ActionType.ExecuteSuccessQueryAction;
  payload: {
    id: Id;
    results: string;
  };
}

export interface SetActiveQueryAction extends BaseAction {
  type: ActionType.SetActiveQueryAction;
  payload: {
    id: Id;
  };
}

export interface BaseMessage {
  id?: Id;
}

export enum MessageType {
  InitMessage,
  ActionPerformedMessage,
}

export type Message = InitMessage | ActionPerformedMessage;

export interface InitMessage extends BaseMessage {
  type: MessageType.InitMessage;
  payload: null;
}

export interface ActionPerformedMessage extends BaseMessage {
  type: MessageType.ActionPerformedMessage;
  payload: {
    action: Action;
  };
}

/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../_userProject/defs/app.def.json
    |> tsTypeWriter
    |> types/app.types.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/
