import React, { useState } from 'react';
import { Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';

import Header from '../Header';
import Repos from '../Repos';
import './styles.css';

const BASE_URL = 'https://api.github.com/search/repositories?q=';

const App = () => {
  const [message, setMessage] = useState('Pas encore de résultats');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);

  const handleInputChange = (enteredText) => {
    setInputText(enteredText);
  };

  const handleFormSubmit = () => {
    setLoading(true);
    axios({
      method: 'get',
      url: `${BASE_URL}${inputText}`,
    })
      .then((res) => {
        setRepos(res.data.items);
        const newMessage = `La recherche a générée ${res.data.total_count} résultats`;
        setMessage(newMessage);
      })
      .catch((err) => {
        console.trace(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="app">
      <Header
        loading={loading}
        inputValue={inputText}
        onInputChange={handleInputChange}
        onFormSubmit={handleFormSubmit}
      />
      <Message content={message} />
      <Repos list={repos} />
    </div>
  );
};

export default App;
