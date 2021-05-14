import React, { useState, useEffect } from 'react';
import { Message, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';

import Header from '../Header';
import Repos from '../Repos';
import './styles.css';

const BASE_URL = 'https://api.github.com/search/repositories?q=';

const App = () => {
  const [message, setMessage] = useState('Pas encore de résultats');
  const [inputText, setInputText] = useState('react');
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [activePage, setActivePage] = useState(1);

  const handleInputChange = (enteredText) => {
    setInputText(enteredText);
  };

  const fetchDatas = async () => {
    if (!inputText) return;
    setLoading(true);
    const filters = `&sort=stars&order=desc&page=${activePage}&per_page=9`;

    try {
      const results = await axios({
        method: 'get',
        url: `${BASE_URL}${inputText}${filters}`,
      });

      setRepos([...repos, ...results.data.items]);
      const newMessage = `La recherche a générée ${results.data.total_count} résultats`;
      setMessage(newMessage);
    }
    catch (e) {
      console.trace(e);
    }
    setLoading(false);
  };

  const handleFormSubmit = () => {
    fetchDatas();
  };

  const handleShowMore = () => {
    setActivePage(activePage + 1);
  };

  useEffect(fetchDatas, [activePage]);

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
      <Button
        fluid
        loading={loading}
        color="blue"
        icon="plus"
        size="huge"
        content="Afficher plus de repos"
        onClick={handleShowMore}
        disabled={loading}
      />
    </div>
  );
};

export default App;
