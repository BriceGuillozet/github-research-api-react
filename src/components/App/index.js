import React from 'react';
import { Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import data from 'src/assets/data/repos';

import Header from '../Header';
import Repos from '../Repos';
import './styles.css';

const App = () => (
  <div className="app">
    <Header
      inputValue="Coucou"
      onInputChange={(inputText) => {
        console.log('change with ', inputText);
      }}
      onFormSubmit={() => {
        console.log('submit');
      }}
    />
    <Message content="Je suis un message" />
    <Repos list={data.items} />
  </div>
);

export default App;
