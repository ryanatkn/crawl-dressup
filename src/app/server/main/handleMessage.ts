import * as t from '../../client/types';

import {PrimusSpark, ServerCtx} from '../types';

import {logger} from '../utils/log';

// import {updateSessionUserId, saveSession} from '../middleware/session';

const log = logger('handleMessage');

// Handles messages coming in from clients,
// causing mutations on the ctx and
// responding with or broadcasting any appropriate messages.
export async function handleMessage(
  appCtx: ServerCtx,
  spark: PrimusSpark,
  message: t.Message,
): Promise<void> {
  log('handling message', message);
  // if (message.authorId !== spark.request.session.userId) { ... } // TODO validate against session
  switch (message.type) {
    case t.MessageType.InitMessage:
      // Acknowledge the client has initialized
      await spark.writeMessage({
        type: t.MessageType.InitMessage,
        payload: null,
      });
      break;
    case t.MessageType.ActionPerformedMessage:
      await spark.writeMessage(message);
      break;
    // case t.MessageType.ThrowErrorTest:
    //   throw new Error('meow ' + message.payload);
    // case t.MessageType.SignIn:
    //   await signIn(
    //     appCtx,
    //     spark,
    //     message.payload.email,
    //     message.payload.password,
    //   );
    //   break;
    // case t.MessageType.SignOut:
    //   await signOut(appCtx, spark);
    //   break;
    // case t.MessageType.SignUp:
    //   await signUp(appCtx, spark, message.payload.email);
    //   break;
    // case t.MessageType.ChannelMessage:
    //   appCtx.primus.writeMessage(message); // broadcast to all
    //   break;
    default:
      t.is<never>(message);
  }
}

// async function signIn(
//   ctx: ServerCtx,
//   spark: PrimusSpark,
//   email: string,
//   password: string,
// ): Promise<void> {
//   // TODO validate password!!
//   spark.request.session!.userId = email;
//   await saveSession(spark.request.session!);
//   ctx.primus.writeMessage({
//     kind: 'channelMessage',
//     payload: {channelName: 'global', text: `${email} has signed in.`},
//   });
// }

// async function signOut(ctx: ServerCtx, spark: PrimusSpark): Promise<void> {
//   ctx.primus.writeMessage({
//     kind: 'channelMessage', // TODO Message.ChannelBroadcast
//     payload: {
//       channelName: 'global',
//       text: `${spark.request.session!.userId} has signed out.`,
//     }, // tslint:disable-line:max-line-length
//   });
//   await updateSessionUserId(spark.request.session!, undefined);
// }

// async function signUp(
//   ctx: ServerCtx,
//   spark: PrimusSpark,
//   email: string,
// ): Promise<void> {
//   log('sign up', email);
// }
