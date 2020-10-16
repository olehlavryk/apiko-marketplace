import { createContext, useContext } from 'react';
import { RootStore } from 'src/stores/RootStore';

export function createStore() {
  const root = RootStore.create();

  return root;
}

const MSTContext = createContext(null);

export const { Provider } = MSTContext;

export function useStore(mapStateToProps) {
  const store = useContext(MSTContext);

  if (typeof MSTContext === 'function') {
    return mapStateToProps(store);
  }

  return store;
}
