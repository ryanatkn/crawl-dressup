/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../defs/app.def.json
    |> tsExportDefJsonWriter
    |> ../defs/app.def.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/

import * as defs from '../defs';

export const appDef: defs.AppDef = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  id: 'http://dbslate.com/v1/defs/app.def.json',
  name: 'app',
  title: 'dbslate',
  description: 'dbslate app def',
  type: 'object',
  definitions: {
    Id: {
      title: 'Id',
      type: 'string',
      minLength: 26,
      maxLength: 26,
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
          $ref: '#/definitions/FailedQuery',
        },
        {
          $ref: '#/definitions/ResolvedQuery',
        },
      ],
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
    },
    FailedQuery: {
      title: 'FailedQuery',
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
    },
    BaseAction: {
      title: 'BaseAction',
      type: 'object',
      properties: {
        cid: {
          $ref: '#/definitions/Id',
        },
      },
    },
    ActionReceivedByServer: {
      title: 'ActionReceivedByServer',
      allOf: [
        {
          $ref: '#/definitions/BaseAction',
        },
      ],
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/Id',
        },
      },
      required: ['id'],
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
    },
  },
  properties: {},
};

/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../defs/app.def.json
    |> tsExportDefJsonWriter
    |> ../defs/app.def.gen.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/
