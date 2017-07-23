import * as t from '../types';

import {logger} from '../utils/log';

const log = logger('handleMessage');

export async function handleMessage(
  stores: t.Store,
  message: t.Message,
): Promise<void> {
  log(t.MessageType[message.type], message, stores);
  switch (message.type) {
    case t.MessageType.InitMessage:
      log('init');
      break;
    case t.MessageType.ActionPerformedMessage:
      log('performed action');
      log(message.payload);
      break;
    // case t.MessageType.ThrowErrorTest:
    //   throw new Error('meow ' + action.payload);
    // case t.MessageType.ChannelMessage:
    //   stores.channelStore.receiveMessage(action);
    //   break;
    default:
      t.is<never>(message);
  }
}
