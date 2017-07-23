/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../_userProject/defs/app.def.json
    |> tsReducerTestWriter
    |> client/reducers/app.reducer.gen.test.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/

// TODO make these tests more robust - like with snapshot testing
// problem is snapshot testing doesn't play nicely with ids

import * as rand from '../../../utils/rand';
import * as t from '../types';

import {reducer} from './index';

it('applies a SignUpUserAction against the store state', () => {
  const state = reducer(undefined, t.signUpUser(rand.str()));
  t.is<t.ClientState>(state);
});

it('applies a SignInUserAction against the store state', () => {
  const state = reducer(undefined, t.signInUser(rand.str(), rand.str()));
  t.is<t.ClientState>(state);
});

it('applies a SignOutUserAction against the store state', () => {
  const state = reducer(undefined, t.signOutUser());
  t.is<t.ClientState>(state);
});

it('applies a CreateQueryAction against the store state', () => {
  const state = reducer(undefined, t.createQuery(t.mockQuery()));
  t.is<t.ClientState>(state);
});

it('applies a ReadQueryAction against the store state', () => {
  const state = reducer(undefined, t.readQuery());
  t.is<t.ClientState>(state);
});

it('applies a UpdateQueryAction against the store state', () => {
  const state = reducer(
    undefined,
    t.updateQuery(t.mockId(), t.mockId(), rand.str(), rand.str()),
  );
  t.is<t.ClientState>(state);
});

it('applies a DeleteQueryAction against the store state', () => {
  const state = reducer(undefined, t.deleteQuery(t.mockId()));
  t.is<t.ClientState>(state);
});

it('applies a ExecuteQueryAction against the store state', () => {
  const state = reducer(undefined, t.executeQuery(t.mockId()));
  t.is<t.ClientState>(state);
});

it('applies a ExecuteSuccessQueryAction against the store state', () => {
  const state = reducer(
    undefined,
    t.executeSuccessQuery(t.mockId(), rand.str()),
  );
  t.is<t.ClientState>(state);
});

it('applies a SetActiveQueryAction against the store state', () => {
  const state = reducer(undefined, t.setActiveQuery(t.mockId()));
  t.is<t.ClientState>(state);
});

/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../_userProject/defs/app.def.json
    |> tsReducerTestWriter
    |> client/reducers/app.reducer.gen.test.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/
