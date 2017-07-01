import * as React from 'react';

import {logger} from '../utils/logger';

const dbg = logger('Frame', {count: ['render']});

export interface Props extends React.ClassAttributes<any>, React.HTMLAttributes<
  HTMLDivElement
> {}

export const Frame = ({children, style, ...rest}: Props): JSX.Element => {
  dbg('render', Frame);
  return (
    <div
      className="Frame"
      style={{
        ...style,
        backgroundColor: 'rgba(255, 250, 245, 0.95)',
        flex: 1,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
