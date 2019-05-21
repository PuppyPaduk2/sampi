import * as React from 'react';

import Context from './context';
import { IDataContext, IContext } from './context/interfaces';

const Container: React.FC<{ children: React.ReactChild | React.ReactChild[] }> = ({
  children
}) => {
  const [store] = React.useState<IDataContext>({});

  const value: IContext = {
    ...store,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Container;
