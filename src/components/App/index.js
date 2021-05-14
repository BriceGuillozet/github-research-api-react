import React, { useState, useEffect } from 'react';
import { Message, Button } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Header from '../Header';
import Repos from '../Repos';
import SingleRepo from '../SingleRepo';
import './styles.css';

import { BASE_URL, REPO_URL } from './const';
import axiosReq from './utils';

const App = () => {
  const [message, setMessage] = useState('Pas encore de résultats');
  const [inputText, setInputText] = useState('react');
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [fullRepo, setFullRepo] = useState({});
  const [newPage, setNewPage] = useState(true);

  const fetchDatas = async () => {
    if (newPage) {
      setActivePage(1);
    }
    if (!inputText) return;
    setLoading(true);
    const filters = `&sort=stars&order=desc&page=${activePage}&per_page=9`;
    const url = `${BASE_URL}${inputText}${filters}`;
    try {
      const results = await axiosReq(url);
      if (newPage) {
        setRepos([...results.data.items]);
      }
      else {
        setRepos([...repos, ...results.data.items]);
      }
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
      const response = await axiosReq(url);
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
    setNewPage(true);
    fetchDatas();
  };

  const handleShowMore = () => {
    setNewPage(false);
    setActivePage(activePage + 1);
  };

  useEffect(fetchDatas, [activePage, newPage]);

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
