/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../_userProject/defs/app.def.json
    |> tsActionTestWriter
    |> client/actions/app.actions.gen.test.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/

// TODO make these tests more robust - like with snapshot testing

import * as rand from '../../../utils/rand';
import * as t from '../types';

it('calls the SignUpUserAction creator', () => {
  const action = t.signUpUser(rand.str());
  t.is<t.SignUpUserAction>(action);
});

it('calls the SignInUserAction creator', () => {
  const action = t.signInUser(rand.str(), rand.str());
  t.is<t.SignInUserAction>(action);
});

it('calls the SignOutUserAction creator', () => {
  const action = t.signOutUser();
  t.is<t.SignOutUserAction>(action);
});

it('calls the CreateQueryAction creator', () => {
  const action = t.createQuery(t.mockQuery());
  t.is<t.CreateQueryAction>(action);
});

it('calls the ReadQueryAction creator', () => {
  const action = t.readQuery();
  t.is<t.ReadQueryAction>(action);
});

it('calls the UpdateQueryAction creator', () => {
  const action = t.updateQuery(t.mockId(), t.mockId(), rand.str(), rand.str());
  t.is<t.UpdateQueryAction>(action);
});

it('calls the DeleteQueryAction creator', () => {
  const action = t.deleteQuery(t.mockId());
  t.is<t.DeleteQueryAction>(action);
});

it('calls the ExecuteQueryAction creator', () => {
  const action = t.executeQuery(t.mockId());
  t.is<t.ExecuteQueryAction>(action);
});

it('calls the ExecuteSuccessQueryAction creator', () => {
  const action = t.executeSuccessQuery(t.mockId(), rand.str());
  t.is<t.ExecuteSuccessQueryAction>(action);
});

it('calls the SetActiveQueryAction creator', () => {
  const action = t.setActiveQuery(t.mockId());
  t.is<t.SetActiveQueryAction>(action);
});

/*
~!! WARNING !!~
~!! This is an auto-generated file.
~!! All edits will be lost!

../_userProject/defs/app.def.json
    |> tsActionTestWriter
    |> client/actions/app.actions.gen.test.ts

~!! This is an auto-generated file.
~!! All edits will be lost!
~!! WARNING !!~
*/
