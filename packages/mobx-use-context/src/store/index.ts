import React from 'react';
import counter from 'src/store/counter';
import welcome from 'src/store/welcome';

export const StoreContext = React.createContext({
  counter,
  welcome,
});
