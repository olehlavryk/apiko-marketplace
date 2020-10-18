import React, { useState, useEffect } from 'react';
import Router from './scenes/routes';
import { createStore, Provider } from './stores/createStore';

const store = createStore();

function App() {
  // const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    store.bootstrap().then(() => {
      // setLoading(false);
    });
  }, []);

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  return (
    <main>
      <Provider value={store}>
        <Router />
      </Provider>
    </main>
  );
}

export default App;
