/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../app/defs/app.clay.json
    |> tsDefWriter
    |> defs/app.clay.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/

import {Clay} from '../../gen';

export const clay: Clay = {
  name: 'app',
  title: 'enti',
  description: 'enti app def',
  type: 'object',
  definitions: {
    Id: {
      title: 'Id',
      type: 'string',
      minLength: 26,
      maxLength: 26,
      id: 'Id',
      code: {
        declaration: 'export type Id = string;\n',
      },
    },
    Json: {
      title: 'Json',
      anyOf: [
        {
          type: 'array',
        },
        {
          type: 'object',
        },
        {
          type: 'boolean',
        },
        {
          type: 'number',
        },
        {
          type: 'integer',
        },
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      id: 'Json',
      code: {
        declaration:
          'export type Json = any[] | object | boolean | number | number | string | null;\n',
      },
    },
    Path: {
      title: 'Path',
      type: 'string',
      id: 'Path',
      code: {
        declaration: 'export type Path = string;\n',
      },
    },
    Entity: {
      title: 'Entity',
      type: 'object',
      properties: {
        id: {
          $ref: 'Id',
        },
      },
      patternProperties: {
        '^[a-zA-Z0-9]+$': {
          $ref: 'Json',
        },
      },
      required: ['id'],
      id: 'Entity',
      code: {
        declaration: 'export interface Entity {id: Id}\n',
      },
    },
    ClientState: {
      title: 'ClientState',
      type: 'object',
      properties: {
        entities: {
          type: 'object',
          patternProperties: {
            '^[A-Z0-9]{26}$': {
              $ref: 'Entity',
            },
            '^[a-zA-Z0-9]+': {
              $ref: 'Entity',
            },
          },
        },
      },
      required: ['entities'],
      id: 'ClientState',
      code: {
        declaration: 'export interface ClientState {entities: object}\n',
      },
    },
    Character: {
      title: 'Character',
      type: 'object',
      allOf: [
        {
          $ref: 'Entity',
        },
      ],
      properties: {
        name: {
          type: 'string',
        },
        avatars: {
          type: 'array',
          items: {
            $ref: 'Avatar',
          },
        },
        activeAvatarId: {
          $ref: 'Id',
        },
      },
      required: ['name', 'avatars', 'activeAvatarId'],
      id: 'Character',
      code: {
        declaration:
          'export interface Character extends Entity {\n  name: string;\n  avatars: Avatar[];\n  activeAvatarId: Id;\n}\n',
      },
    },
    Avatar: {
      title: 'Avatar',
      type: 'object',
      allOf: [
        {
          $ref: 'Entity',
        },
      ],
      properties: {
        costume: {
          $ref: 'Costume',
        },
      },
      required: ['costume'],
      id: 'Avatar',
      code: {
        declaration:
          'export interface Avatar extends Entity {costume: Costume}\n',
      },
    },
    Costume: {
      title: 'Costume',
      type: 'object',
      allOf: [
        {
          $ref: 'Entity',
        },
      ],
      properties: {
        base: {
          anyOf: [
            {
              $ref: 'Id',
            },
            {
              type: 'null',
            },
          ],
        },
        hair: {
          anyOf: [
            {
              $ref: 'Id',
            },
            {
              type: 'null',
            },
          ],
        },
        beard: {
          anyOf: [
            {
              $ref: 'Id',
            },
            {
              type: 'null',
            },
          ],
        },
        body: {
          anyOf: [
            {
              $ref: 'Id',
            },
            {
              type: 'null',
            },
          ],
        },
        legs: {
          anyOf: [
            {
              $ref: 'Id',
            },
            {
              type: 'null',
            },
          ],
        },
        hand1: {
          anyOf: [
            {
              $ref: 'Id',
            },
            {
              type: 'null',
            },
          ],
        },
        hand2: {
          anyOf: [
            {
              $ref: 'Id',
            },
            {
              type: 'null',
            },
          ],
        },
        head: {
          anyOf: [
            {
              $ref: 'Id',
            },
            {
              type: 'null',
            },
          ],
        },
        gloves: {
          anyOf: [
            {
              $ref: 'Id',
            },
            {
              type: 'null',
            },
          ],
        },
        boots: {
          anyOf: [
            {
              $ref: 'Id',
            },
            {
              type: 'null',
            },
          ],
        },
        cloak: {
          anyOf: [
            {
              $ref: 'Id',
            },
            {
              type: 'null',
            },
          ],
        },
        felids: {
          anyOf: [
            {
              $ref: 'Id',
            },
            {
              type: 'null',
            },
          ],
        },
      },
      required: [
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
      ],
      id: 'Costume',
      code: {
        declaration:
          'export interface Costume extends Entity {\n  base: Id | null;\n  hair: Id | null;\n  beard: Id | null;\n  body: Id | null;\n  legs: Id | null;\n  hand1: Id | null;\n  hand2: Id | null;\n  head: Id | null;\n  gloves: Id | null;\n  boots: Id | null;\n  cloak: Id | null;\n  felids: Id | null;\n}\n',
      },
    },
    DataSource: {
      title: 'DataSource',
      type: 'object',
      properties: {
        kind: {
          enum: ['sql', 'mongo'],
        },
        id: {
          $ref: 'Id',
        },
        title: {
          type: 'string',
        },
        uri: {
          type: 'string',
        },
      },
      required: ['kind', 'id', 'title', 'uri'],
      id: 'DataSource',
      code: {
        declaration:
          "export interface DataSource {\n  kind: 'sql' | 'mongo';\n  id: Id;\n  title: string;\n  uri: string;\n}\n",
      },
    },
    Query: {
      title: 'Query',
      anyOf: [
        {
          $ref: 'NewQuery',
        },
        {
          $ref: 'PendingQuery',
        },
        {
          $ref: 'RejectedQuery',
        },
        {
          $ref: 'ResolvedQuery',
        },
      ],
      id: 'Query',
      code: {
        declaration:
          'export type Query = NewQuery | PendingQuery | RejectedQuery | ResolvedQuery;\n',
      },
    },
    NewQuery: {
      title: 'NewQuery',
      type: 'object',
      properties: {
        status: {
          type: 'string',
          value: 'new',
        },
        id: {
          $ref: 'Id',
        },
        sourceId: {
          $ref: 'Id',
        },
        title: {
          type: 'string',
        },
        raw: {
          type: 'string',
        },
        lastExecuted: {
          anyOf: [
            {
              type: 'string',
            },
            {
              type: 'null',
            },
          ],
        },
      },
      required: ['status', 'id', 'sourceId', 'title', 'raw', 'lastExecuted'],
      id: 'NewQuery',
      code: {
        declaration:
          "export interface NewQuery {\n  status: 'new';\n  id: Id;\n  sourceId: Id;\n  title: string;\n  raw: string;\n  lastExecuted: string | null;\n}\n",
      },
    },
    PendingQuery: {
      title: 'PendingQuery',
      type: 'object',
      properties: {
        status: {
          type: 'string',
          value: 'pending',
        },
        id: {
          $ref: 'Id',
        },
        sourceId: {
          $ref: 'Id',
        },
        title: {
          type: 'string',
        },
        raw: {
          type: 'string',
        },
        lastExecuted: {
          type: 'string',
        },
      },
      required: ['status', 'id', 'sourceId', 'title', 'raw', 'lastExecuted'],
      id: 'PendingQuery',
      code: {
        declaration:
          "export interface PendingQuery {\n  status: 'pending';\n  id: Id;\n  sourceId: Id;\n  title: string;\n  raw: string;\n  lastExecuted: string;\n}\n",
      },
    },
    RejectedQuery: {
      title: 'RejectedQuery',
      type: 'object',
      properties: {
        status: {
          type: 'string',
          value: 'failed',
        },
        id: {
          $ref: 'Id',
        },
        sourceId: {
          $ref: 'Id',
        },
        title: {
          type: 'string',
        },
        raw: {
          type: 'string',
        },
        lastExecuted: {
          type: 'string',
        },
        error: {
          type: 'string',
        },
      },
      required: [
        'status',
        'id',
        'sourceId',
        'title',
        'raw',
        'lastExecuted',
        'error',
      ],
      id: 'RejectedQuery',
      code: {
        declaration:
          "export interface RejectedQuery {\n  status: 'failed';\n  id: Id;\n  sourceId: Id;\n  title: string;\n  raw: string;\n  lastExecuted: string;\n  error: string;\n}\n",
      },
    },
    ResolvedQuery: {
      title: 'ResolvedQuery',
      type: 'object',
      properties: {
        status: {
          type: 'string',
          value: 'resolved',
        },
        id: {
          $ref: 'Id',
        },
        sourceId: {
          $ref: 'Id',
        },
        title: {
          type: 'string',
        },
        raw: {
          type: 'string',
        },
        lastExecuted: {
          type: 'string',
        },
        results: {
          anyOf: [
            {
              type: 'boolean',
            },
            {
              type: 'null',
            },
            {
              type: 'number',
            },
            {
              type: 'object',
            },
            {
              type: 'string',
            },
          ],
        },
      },
      required: [
        'status',
        'id',
        'sourceId',
        'title',
        'raw',
        'lastExecuted',
        'results',
      ],
      id: 'ResolvedQuery',
      code: {
        declaration:
          "export interface ResolvedQuery {\n  status: 'resolved';\n  id: Id;\n  sourceId: Id;\n  title: string;\n  raw: string;\n  lastExecuted: string;\n  results: boolean | null | number | object | string;\n}\n",
      },
    },
    BaseAction: {
      title: 'BaseAction',
      type: 'object',
      properties: {
        id: {
          $ref: 'Id',
        },
      },
      id: 'BaseAction',
      code: {
        declaration: 'export interface BaseAction {id?: Id}\n',
      },
    },
    ActionType: {
      title: 'ActionType',
      enum: [
        'UpdateEntityAction',
        'SignUpUserAction',
        'SignInUserAction',
        'SignOutUserAction',
        'CreateQueryAction',
        'ReadQueryAction',
        'UpdateQueryAction',
        'DeleteQueryAction',
        'ExecuteQueryAction',
        'ExecuteSuccessQueryAction',
        'SetActiveQueryAction',
      ],
      id: 'ActionType',
      code: {
        declaration:
          "export enum ActionType {\n  UpdateEntityAction = 'UpdateEntityAction',\n  SignUpUserAction = 'SignUpUserAction',\n  SignInUserAction = 'SignInUserAction',\n  SignOutUserAction = 'SignOutUserAction',\n  CreateQueryAction = 'CreateQueryAction',\n  ReadQueryAction = 'ReadQueryAction',\n  UpdateQueryAction = 'UpdateQueryAction',\n  DeleteQueryAction = 'DeleteQueryAction',\n  ExecuteQueryAction = 'ExecuteQueryAction',\n  ExecuteSuccessQueryAction = 'ExecuteSuccessQueryAction',\n  SetActiveQueryAction = 'SetActiveQueryAction',\n}\n",
      },
    },
    Action: {
      title: 'Action',
      anyOf: [
        {
          $ref: 'UpdateEntityAction',
        },
        {
          $ref: 'SignUpUserAction',
        },
        {
          $ref: 'SignInUserAction',
        },
        {
          $ref: 'SignOutUserAction',
        },
        {
          $ref: 'CreateQueryAction',
        },
        {
          $ref: 'ReadQueryAction',
        },
        {
          $ref: 'UpdateQueryAction',
        },
        {
          $ref: 'DeleteQueryAction',
        },
        {
          $ref: 'ExecuteQueryAction',
        },
        {
          $ref: 'ExecuteSuccessQueryAction',
        },
        {
          $ref: 'SetActiveQueryAction',
        },
      ],
      id: 'Action',
      code: {
        declaration:
          'export type Action =\n  | UpdateEntityAction\n  | SignUpUserAction\n  | SignInUserAction\n  | SignOutUserAction\n  | CreateQueryAction\n  | ReadQueryAction\n  | UpdateQueryAction\n  | DeleteQueryAction\n  | ExecuteQueryAction\n  | ExecuteSuccessQueryAction\n  | SetActiveQueryAction;\n',
      },
    },
    UpdateEntityAction: {
      title: 'UpdateEntityAction',
      type: 'object',
      allOf: [
        {
          $ref: 'BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: 'ActionType',
          value: 'UpdateEntityAction',
        },
        payload: {
          type: 'object',
          properties: {
            id: {
              $ref: 'Id',
            },
            key: {
              type: 'string',
            },
            value: {
              $ref: 'Json',
            },
          },
          required: ['id', 'key', 'value'],
        },
      },
      required: ['type', 'payload'],
      id: 'UpdateEntityAction',
      code: {
        declaration:
          'export interface UpdateEntityAction extends BaseAction {\n  type: ActionType.UpdateEntityAction;\n  payload: {id: Id; key: string; value: Json};\n}\n',
      },
    },
    SignUpUserAction: {
      title: 'SignUpUserAction',
      type: 'object',
      allOf: [
        {
          $ref: 'BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: 'ActionType',
          value: 'SignUpUserAction',
        },
        payload: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
            },
          },
          required: ['email'],
        },
      },
      required: ['type', 'payload'],
      id: 'SignUpUserAction',
      code: {
        declaration:
          'export interface SignUpUserAction extends BaseAction {\n  type: ActionType.SignUpUserAction;\n  payload: {email: string};\n}\n',
      },
    },
    SignInUserAction: {
      title: 'SignInUserAction',
      type: 'object',
      allOf: [
        {
          $ref: 'BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: 'ActionType',
          value: 'SignInUserAction',
        },
        payload: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
          required: ['email', 'password'],
        },
      },
      required: ['type', 'payload'],
      id: 'SignInUserAction',
      code: {
        declaration:
          'export interface SignInUserAction extends BaseAction {\n  type: ActionType.SignInUserAction;\n  payload: {email: string; password: string};\n}\n',
      },
    },
    SignOutUserAction: {
      title: 'SignOutUserAction',
      type: 'object',
      allOf: [
        {
          $ref: 'BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: 'ActionType',
          value: 'SignOutUserAction',
        },
        payload: {
          type: 'null',
        },
      },
      required: ['type', 'payload'],
      id: 'SignOutUserAction',
      code: {
        declaration:
          'export interface SignOutUserAction extends BaseAction {\n  type: ActionType.SignOutUserAction;\n  payload: null;\n}\n',
      },
    },
    CreateQueryAction: {
      title: 'CreateQueryAction',
      type: 'object',
      allOf: [
        {
          $ref: 'BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: 'ActionType',
          value: 'CreateQueryAction',
        },
        payload: {
          type: 'object',
          properties: {
            query: {
              $ref: 'Query',
            },
          },
          required: ['query'],
        },
      },
      required: ['type', 'payload'],
      id: 'CreateQueryAction',
      code: {
        declaration:
          'export interface CreateQueryAction extends BaseAction {\n  type: ActionType.CreateQueryAction;\n  payload: {query: Query};\n}\n',
      },
    },
    ReadQueryAction: {
      title: 'ReadQueryAction',
      type: 'object',
      allOf: [
        {
          $ref: 'BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: 'ActionType',
          value: 'ReadQueryAction',
        },
        payload: {
          type: 'null',
        },
      },
      required: ['type', 'payload'],
      id: 'ReadQueryAction',
      code: {
        declaration:
          'export interface ReadQueryAction extends BaseAction {\n  type: ActionType.ReadQueryAction;\n  payload: null;\n}\n',
      },
    },
    UpdateQueryAction: {
      title: 'UpdateQueryAction',
      type: 'object',
      allOf: [
        {
          $ref: 'BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: 'ActionType',
          value: 'UpdateQueryAction',
        },
        payload: {
          type: 'object',
          properties: {
            id: {
              $ref: 'Id',
            },
            sourceId: {
              $ref: 'Id',
            },
            title: {
              type: 'string',
            },
            raw: {
              type: 'string',
            },
          },
          required: ['id'],
        },
      },
      required: ['type', 'payload'],
      id: 'UpdateQueryAction',
      code: {
        declaration:
          'export interface UpdateQueryAction extends BaseAction {\n  type: ActionType.UpdateQueryAction;\n  payload: {id: Id; sourceId?: Id; title?: string; raw?: string};\n}\n',
      },
    },
    DeleteQueryAction: {
      title: 'DeleteQueryAction',
      type: 'object',
      allOf: [
        {
          $ref: 'BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: 'ActionType',
          value: 'DeleteQueryAction',
        },
        payload: {
          type: 'object',
          properties: {
            id: {
              $ref: 'Id',
            },
          },
          required: ['id'],
        },
      },
      required: ['type', 'payload'],
      id: 'DeleteQueryAction',
      code: {
        declaration:
          'export interface DeleteQueryAction extends BaseAction {\n  type: ActionType.DeleteQueryAction;\n  payload: {id: Id};\n}\n',
      },
    },
    ExecuteQueryAction: {
      title: 'ExecuteQueryAction',
      type: 'object',
      allOf: [
        {
          $ref: 'BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: 'ActionType',
          value: 'ExecuteQueryAction',
        },
        payload: {
          type: 'object',
          properties: {
            id: {
              $ref: 'Id',
            },
          },
          required: ['id'],
        },
      },
      required: ['type', 'payload'],
      id: 'ExecuteQueryAction',
      code: {
        declaration:
          'export interface ExecuteQueryAction extends BaseAction {\n  type: ActionType.ExecuteQueryAction;\n  payload: {id: Id};\n}\n',
      },
    },
    ExecuteSuccessQueryAction: {
      title: 'ExecuteSuccessQueryAction',
      type: 'object',
      allOf: [
        {
          $ref: 'BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: 'ActionType',
          value: 'ExecuteSuccessQueryAction',
        },
        payload: {
          type: 'object',
          properties: {
            id: {
              $ref: 'Id',
            },
            results: {
              type: 'string',
            },
          },
          required: ['id', 'results'],
        },
      },
      required: ['type', 'payload'],
      id: 'ExecuteSuccessQueryAction',
      code: {
        declaration:
          'export interface ExecuteSuccessQueryAction extends BaseAction {\n  type: ActionType.ExecuteSuccessQueryAction;\n  payload: {id: Id; results: string};\n}\n',
      },
    },
    SetActiveQueryAction: {
      title: 'SetActiveQueryAction',
      type: 'object',
      allOf: [
        {
          $ref: 'BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: 'ActionType',
          value: 'SetActiveQueryAction',
        },
        payload: {
          type: 'object',
          properties: {
            id: {
              $ref: 'Id',
            },
          },
          required: ['id'],
        },
      },
      required: ['type', 'payload'],
      id: 'SetActiveQueryAction',
      code: {
        declaration:
          'export interface SetActiveQueryAction extends BaseAction {\n  type: ActionType.SetActiveQueryAction;\n  payload: {id: Id};\n}\n',
      },
    },
    CharacterCategory: {
      title: 'CharacterCategory',
      enum: [
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
        'barding',
        'ench',
        'halo',
        'mutations',
        'transform',
      ],
      id: 'CharacterCategory',
      code: {
        declaration:
          "export enum CharacterCategory {\n  base = 'base',\n  hair = 'hair',\n  beard = 'beard',\n  body = 'body',\n  legs = 'legs',\n  hand1 = 'hand1',\n  hand2 = 'hand2',\n  head = 'head',\n  gloves = 'gloves',\n  boots = 'boots',\n  cloak = 'cloak',\n  felids = 'felids',\n  drcwing = 'drcwing',\n  drchead = 'drchead',\n  barding = 'barding',\n  ench = 'ench',\n  halo = 'halo',\n  mutations = 'mutations',\n  transform = 'transform',\n}\n",
      },
    },
    ImageData: {
      title: 'ImageData',
      type: 'object',
      allOf: [
        {
          $ref: 'Entity',
        },
      ],
      properties: {
        url: {
          type: 'string',
        },
        parts: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        category: {
          $ref: 'CharacterCategory',
        },
      },
      required: ['url', 'parts', 'category'],
      id: 'ImageData',
      code: {
        declaration:
          'export interface ImageData extends Entity {\n  url: string;\n  parts: string[];\n  category: CharacterCategory;\n}\n',
      },
    },
    BaseMessage: {
      title: 'BaseMessage',
      type: 'object',
      properties: {
        id: {
          $ref: 'Id',
        },
      },
      id: 'BaseMessage',
      code: {
        declaration: 'export interface BaseMessage {id?: Id}\n',
      },
    },
    MessageType: {
      title: 'MessageType',
      enum: ['InitMessage', 'ActionPerformedMessage'],
      id: 'MessageType',
      code: {
        declaration:
          "export enum MessageType {\n  InitMessage = 'InitMessage',\n  ActionPerformedMessage = 'ActionPerformedMessage',\n}\n",
      },
    },
    Message: {
      title: 'Message',
      anyOf: [
        {
          $ref: 'InitMessage',
        },
        {
          $ref: 'ActionPerformedMessage',
        },
      ],
      id: 'Message',
      code: {
        declaration:
          'export type Message = InitMessage | ActionPerformedMessage;\n',
      },
    },
    InitMessage: {
      title: 'InitMessage',
      type: 'object',
      allOf: [
        {
          $ref: 'BaseMessage',
        },
      ],
      properties: {
        type: {
          $ref: 'MessageType',
          value: 'InitMessage',
        },
        payload: {
          type: 'null',
        },
      },
      required: ['type', 'payload'],
      id: 'InitMessage',
      code: {
        declaration:
          'export interface InitMessage extends BaseMessage {\n  type: MessageType.InitMessage;\n  payload: null;\n}\n',
      },
    },
    ActionPerformedMessage: {
      title: 'ActionPerformedMessage',
      type: 'object',
      allOf: [
        {
          $ref: 'BaseMessage',
        },
      ],
      properties: {
        type: {
          $ref: 'MessageType',
          value: 'ActionPerformedMessage',
        },
        payload: {
          type: 'object',
          properties: {
            action: {
              $ref: 'Action',
            },
          },
          required: ['action'],
        },
      },
      required: ['type', 'payload'],
      id: 'ActionPerformedMessage',
      code: {
        declaration:
          'export interface ActionPerformedMessage extends BaseMessage {\n  type: MessageType.ActionPerformedMessage;\n  payload: {action: Action};\n}\n',
      },
    },
  },
  properties: {},
};

/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../app/defs/app.clay.json
    |> tsDefWriter
    |> defs/app.clay.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/
