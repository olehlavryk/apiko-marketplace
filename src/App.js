import React from 'react';
import Router from './scenes/routes';
import { createStore, Provider } from './stores/createStore';

const store = createStore();

function App() {
  return (
    <main>
      <Provider value={store}>
        <Router />
      </Provider>
    </main>
  );
}

export default App;
