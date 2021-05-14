import React, { useState } from 'react';

import { Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import data from 'src/assets/data/repos';

import Header from '../Header';
import Repos from '../Repos';
import './styles.css';

const BASE_URL = 'https://api.github.com/search/repositories?q=';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [repos, setRepos] = useState(data.items);

  const handleInputChange = (enteredText) => {
    setInputText(enteredText);
  };

  const handleFormSubmit = () => {
    axios({
      method: 'get',
      url: `${BASE_URL}${inputText}`,
    })
      .then((res) => {
        setRepos(res.data.items);
      })
      .catch((err) => {
        console.trace(err);
      })
      .finally(() => {

      });
  };

  return (
    <div className="app">
      <Header
        inputValue={inputText}
        onInputChange={handleInputChange}
        onFormSubmit={handleFormSubmit}
      />
      <Message content="Je suis un message" />
      <Repos list={repos} />
    </div>
  );
};

export default App;
