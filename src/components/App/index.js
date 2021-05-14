import React, { useState, useEffect } from 'react';
import { Message, Button } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';

import Header from '../Header';
import Repos from '../Repos';
import SingleRepo from '../SingleRepo';
import './styles.css';

const BASE_URL = 'https://api.github.com/search/repositories?q=';
const REPO_URL = 'https://api.github.com/repos';

const App = () => {
  const [message, setMessage] = useState('Pas encore de résultats');
  const [inputText, setInputText] = useState('react');
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [fullRepo, setFullRepo] = useState({});

  const fetchDatas = async () => {
    if (!inputText) return;
    setRepos([]);
    setActivePage(1);
    setLoading(true);
    const filters = `&sort=stars&order=desc&page=${activePage}&per_page=9`;
    try {
      const results = await axios({
        method: 'get',
        url: `${BASE_URL}${inputText}${filters}`,
      });
      setRepos([...results.data.items]);
      const newMessage = `La recherche a générée ${results.data.total_count} résultats`;
      setMessage(newMessage);
    }
    catch (e) {
      console.trace(e);
    }
    setLoading(false);
  };

  const fetchMoreDatas = async () => {
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

  const fetchOneRepo = async (orga, repo) => {
    const url = `${REPO_URL}/${orga}/${repo}`;
    setLoading(true);
    try {
      const response = await axios({
        method: 'get',
        url,
      });
      setFullRepo(response.data);
    }
    catch (e) {
      console.trace(e);
    }
    setLoading(false);
  };

  const handleInputChange = (enteredText) => {
    setInputText(enteredText);
  };

  const handleFormSubmit = () => {
    fetchDatas();
  };

  const handleShowMore = () => {
    setActivePage(activePage + 1);
  };

  useEffect(fetchDatas, []);

  useEffect(fetchMoreDatas, [activePage]);

  return (
    <div className="app">
      <Header
        loading={loading}
        inputValue={inputText}
        onInputChange={handleInputChange}
        onFormSubmit={handleFormSubmit}
      />
      <Route exact path="/">
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
      </Route>
      <Route
        path="/repos/:orga/:repo"
        render={(infoFromRouter) => {
          const { orga, repo } = infoFromRouter.match.params;
          return (
            <SingleRepo
              activeRepo={fullRepo}
              fetchRepo={() => {
                fetchOneRepo(orga, repo);
              }}
            />
          );
        }}
      />

    </div>
  );
};

export default App;
