/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../app/defs/app.def.json
    |> tsDefWriter
    |> defs/app.def.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/

import {AppDef} from '../../gen';

export const appDef: AppDef = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  id: 'http://enti.com/v1/defs/app.def.json',
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
      code: {
        declaration: 'export type Id = string;\n',
      },
    },
    ClientState: {
      title: 'ClientState',
      type: 'object',
      properties: {
        sources: {
          type: 'array',
          items: {
            $ref: '#/definitions/DataSource',
          },
          uniqueItems: true,
        },
        queries: {
          type: 'array',
          items: {
            $ref: '#/definitions/Query',
          },
          uniqueItems: true,
        },
        activeQueryId: {
          oneOf: [
            {
              type: 'string',
            },
            {
              type: 'null',
            },
          ],
        },
      },
      required: ['sources', 'queries', 'activeQueryId'],
      code: {
        declaration:
          'export interface ClientState {\n  sources: DataSource[];\n  queries: Query[];\n  activeQueryId: string | null;\n}\n',
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
          $ref: '#/definitions/Id',
        },
        title: {
          type: 'string',
        },
        uri: {
          type: 'string',
        },
      },
      required: ['kind', 'id', 'title', 'uri'],
      code: {
        declaration:
          "export interface DataSource {\n  kind: 'sql' | 'mongo';\n  id: Id;\n  title: string;\n  uri: string;\n}\n",
      },
    },
    Query: {
      title: 'Query',
      oneOf: [
        {
          $ref: '#/definitions/NewQuery',
        },
        {
          $ref: '#/definitions/PendingQuery',
        },
        {
          $ref: '#/definitions/RejectedQuery',
        },
        {
          $ref: '#/definitions/ResolvedQuery',
        },
      ],
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
          $ref: '#/definitions/Id',
        },
        sourceId: {
          $ref: '#/definitions/Id',
        },
        title: {
          type: 'string',
        },
        raw: {
          type: 'string',
        },
        lastExecuted: {
          oneOf: [
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
          $ref: '#/definitions/Id',
        },
        sourceId: {
          $ref: '#/definitions/Id',
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
          $ref: '#/definitions/Id',
        },
        sourceId: {
          $ref: '#/definitions/Id',
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
          $ref: '#/definitions/Id',
        },
        sourceId: {
          $ref: '#/definitions/Id',
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
          oneOf: [
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
      code: {
        declaration:
          "export interface ResolvedQuery {\n  status: 'resolved';\n  id: Id;\n  sourceId: Id;\n  title: string;\n  raw: string;\n  lastExecuted: string;\n  results: boolean | null | number | {} | string;\n}\n",
      },
    },
    BaseAction: {
      title: 'BaseAction',
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/Id',
        },
      },
      code: {
        declaration: 'export interface BaseAction {\n  id?: Id;\n}\n',
      },
    },
    ActionType: {
      title: 'ActionType',
      enum: [
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
      code: {
        declaration:
          'export enum ActionType {\n  SignUpUserAction,\n  SignInUserAction,\n  SignOutUserAction,\n  CreateQueryAction,\n  ReadQueryAction,\n  UpdateQueryAction,\n  DeleteQueryAction,\n  ExecuteQueryAction,\n  ExecuteSuccessQueryAction,\n  SetActiveQueryAction,\n}\n',
      },
    },
    Action: {
      title: 'Action',
      oneOf: [
        {
          $ref: '#/definitions/SignUpUserAction',
        },
        {
          $ref: '#/definitions/SignInUserAction',
        },
        {
          $ref: '#/definitions/SignOutUserAction',
        },
        {
          $ref: '#/definitions/CreateQueryAction',
        },
        {
          $ref: '#/definitions/ReadQueryAction',
        },
        {
          $ref: '#/definitions/UpdateQueryAction',
        },
        {
          $ref: '#/definitions/DeleteQueryAction',
        },
        {
          $ref: '#/definitions/ExecuteQueryAction',
        },
        {
          $ref: '#/definitions/ExecuteSuccessQueryAction',
        },
        {
          $ref: '#/definitions/SetActiveQueryAction',
        },
      ],
      code: {
        declaration:
          'export type Action =\n  | SignUpUserAction\n  | SignInUserAction\n  | SignOutUserAction\n  | CreateQueryAction\n  | ReadQueryAction\n  | UpdateQueryAction\n  | DeleteQueryAction\n  | ExecuteQueryAction\n  | ExecuteSuccessQueryAction\n  | SetActiveQueryAction;\n',
      },
    },
    SignUpUserAction: {
      title: 'SignUpUserAction',
      type: 'object',
      id: 'User/SignUp',
      allOf: [
        {
          $ref: '#/definitions/BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: '#/definitions/ActionType',
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
      code: {
        declaration:
          'export interface SignUpUserAction extends BaseAction {\n  type: ActionType.SignUpUserAction;\n  payload: {\n    email: string;\n  };\n}\n',
      },
    },
    SignInUserAction: {
      title: 'SignInUserAction',
      type: 'object',
      id: 'User/SignIn',
      allOf: [
        {
          $ref: '#/definitions/BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: '#/definitions/ActionType',
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
      code: {
        declaration:
          'export interface SignInUserAction extends BaseAction {\n  type: ActionType.SignInUserAction;\n  payload: {\n    email: string;\n    password: string;\n  };\n}\n',
      },
    },
    SignOutUserAction: {
      title: 'SignOutUserAction',
      type: 'object',
      id: 'User/SignOut',
      allOf: [
        {
          $ref: '#/definitions/BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: '#/definitions/ActionType',
          value: 'SignOutUserAction',
        },
        payload: {
          type: 'null',
        },
      },
      required: ['type', 'payload'],
      code: {
        declaration:
          'export interface SignOutUserAction extends BaseAction {\n  type: ActionType.SignOutUserAction;\n  payload: null;\n}\n',
      },
    },
    CreateQueryAction: {
      title: 'CreateQueryAction',
      type: 'object',
      id: 'Query/Create',
      allOf: [
        {
          $ref: '#/definitions/BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: '#/definitions/ActionType',
          value: 'CreateQueryAction',
        },
        payload: {
          type: 'object',
          properties: {
            query: {
              $ref: '#/definitions/Query',
            },
          },
          required: ['query'],
        },
      },
      required: ['type', 'payload'],
      code: {
        declaration:
          'export interface CreateQueryAction extends BaseAction {\n  type: ActionType.CreateQueryAction;\n  payload: {\n    query: Query;\n  };\n}\n',
      },
    },
    ReadQueryAction: {
      title: 'ReadQueryAction',
      type: 'object',
      id: 'Query/Read',
      allOf: [
        {
          $ref: '#/definitions/BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: '#/definitions/ActionType',
          value: 'ReadQueryAction',
        },
        payload: {
          type: 'null',
        },
      },
      required: ['type', 'payload'],
      code: {
        declaration:
          'export interface ReadQueryAction extends BaseAction {\n  type: ActionType.ReadQueryAction;\n  payload: null;\n}\n',
      },
    },
    UpdateQueryAction: {
      title: 'UpdateQueryAction',
      type: 'object',
      id: 'Query/Update',
      allOf: [
        {
          $ref: '#/definitions/BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: '#/definitions/ActionType',
          value: 'UpdateQueryAction',
        },
        payload: {
          type: 'object',
          properties: {
            id: {
              $ref: '#/definitions/Id',
            },
            sourceId: {
              $ref: '#/definitions/Id',
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
      code: {
        declaration:
          'export interface UpdateQueryAction extends BaseAction {\n  type: ActionType.UpdateQueryAction;\n  payload: {\n    id: Id;\n    sourceId?: Id;\n    title?: string;\n    raw?: string;\n  };\n}\n',
      },
    },
    DeleteQueryAction: {
      title: 'DeleteQueryAction',
      type: 'object',
      id: 'Query/Delete',
      allOf: [
        {
          $ref: '#/definitions/BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: '#/definitions/ActionType',
          value: 'DeleteQueryAction',
        },
        payload: {
          type: 'object',
          properties: {
            id: {
              $ref: '#/definitions/Id',
            },
          },
          required: ['id'],
        },
      },
      required: ['type', 'payload'],
      code: {
        declaration:
          'export interface DeleteQueryAction extends BaseAction {\n  type: ActionType.DeleteQueryAction;\n  payload: {\n    id: Id;\n  };\n}\n',
      },
    },
    ExecuteQueryAction: {
      title: 'ExecuteQueryAction',
      type: 'object',
      id: 'Query/Execute',
      allOf: [
        {
          $ref: '#/definitions/BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: '#/definitions/ActionType',
          value: 'ExecuteQueryAction',
        },
        payload: {
          type: 'object',
          properties: {
            id: {
              $ref: '#/definitions/Id',
            },
          },
          required: ['id'],
        },
      },
      required: ['type', 'payload'],
      code: {
        declaration:
          'export interface ExecuteQueryAction extends BaseAction {\n  type: ActionType.ExecuteQueryAction;\n  payload: {\n    id: Id;\n  };\n}\n',
      },
    },
    ExecuteSuccessQueryAction: {
      title: 'ExecuteSuccessQueryAction',
      type: 'object',
      id: 'Query/ExecuteSuccess',
      allOf: [
        {
          $ref: '#/definitions/BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: '#/definitions/ActionType',
          value: 'ExecuteSuccessQueryAction',
        },
        payload: {
          type: 'object',
          properties: {
            id: {
              $ref: '#/definitions/Id',
            },
            results: {
              type: 'string',
            },
          },
          required: ['id', 'results'],
        },
      },
      required: ['type', 'payload'],
      code: {
        declaration:
          'export interface ExecuteSuccessQueryAction extends BaseAction {\n  type: ActionType.ExecuteSuccessQueryAction;\n  payload: {\n    id: Id;\n    results: string;\n  };\n}\n',
      },
    },
    SetActiveQueryAction: {
      title: 'SetActiveQueryAction',
      type: 'object',
      id: 'Query/SetActive',
      allOf: [
        {
          $ref: '#/definitions/BaseAction',
        },
      ],
      properties: {
        type: {
          $ref: '#/definitions/ActionType',
          value: 'SetActiveQueryAction',
        },
        payload: {
          type: 'object',
          properties: {
            id: {
              $ref: '#/definitions/Id',
            },
          },
          required: ['id'],
        },
      },
      required: ['type', 'payload'],
      code: {
        declaration:
          'export interface SetActiveQueryAction extends BaseAction {\n  type: ActionType.SetActiveQueryAction;\n  payload: {\n    id: Id;\n  };\n}\n',
      },
    },
    BaseMessage: {
      title: 'BaseMessage',
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/Id',
        },
      },
      code: {
        declaration: 'export interface BaseMessage {\n  id?: Id;\n}\n',
      },
    },
    MessageType: {
      title: 'MessageType',
      enum: ['InitMessage', 'ActionPerformedMessage'],
      code: {
        declaration:
          'export enum MessageType {\n  InitMessage,\n  ActionPerformedMessage,\n}\n',
      },
    },
    Message: {
      title: 'Message',
      oneOf: [
        {
          $ref: '#/definitions/InitMessage',
        },
        {
          $ref: '#/definitions/ActionPerformedMessage',
        },
      ],
      code: {
        declaration:
          'export type Message = InitMessage | ActionPerformedMessage;\n',
      },
    },
    InitMessage: {
      title: 'InitMessage',
      type: 'object',
      id: 'User/SignUp',
      allOf: [
        {
          $ref: '#/definitions/BaseMessage',
        },
      ],
      properties: {
        type: {
          $ref: '#/definitions/MessageType',
          value: 'InitMessage',
        },
        payload: {
          type: 'null',
        },
      },
      required: ['type', 'payload'],
      code: {
        declaration:
          'export interface InitMessage extends BaseMessage {\n  type: MessageType.InitMessage;\n  payload: null;\n}\n',
      },
    },
    ActionPerformedMessage: {
      title: 'ActionPerformedMessage',
      type: 'object',
      id: 'User/SignUp',
      allOf: [
        {
          $ref: '#/definitions/BaseMessage',
        },
      ],
      properties: {
        type: {
          $ref: '#/definitions/MessageType',
          value: 'ActionPerformedMessage',
        },
        payload: {
          type: 'object',
          properties: {
            action: {
              $ref: '#/definitions/Action',
            },
          },
          required: ['action'],
        },
      },
      required: ['type', 'payload'],
      code: {
        declaration:
          'export interface ActionPerformedMessage extends BaseMessage {\n  type: MessageType.ActionPerformedMessage;\n  payload: {\n    action: Action;\n  };\n}\n',
      },
    },
  },
  properties: {},
};

/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../app/defs/app.def.json
    |> tsDefWriter
    |> defs/app.def.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/
