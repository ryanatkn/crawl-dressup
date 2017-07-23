import * as React from 'react';

export interface Props extends React.ClassAttributes<any>, React.HTMLAttributes<
  HTMLDivElement
> {}

export const Frame = ({
  children,
  style,
  className,
  ...rest,
}: Props): JSX.Element =>
  <div
    className={`Frame ${className || ''}`}
    style={{
      backgroundColor: 'rgba(255, 250, 245, 0.95)',
      flex: 1,
      marginBottom: 10,
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>;
