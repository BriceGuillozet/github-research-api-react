import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import './style.scss';

const Repos = ({ list }) => (
  <div className="repos__list">
    {
    list.map((repoObj) => (
      <div className="repos__item">
        <Link to={`/repos/${repoObj.full_name}`}>
          <Card
            href="#"
            fluid
            style={{ height: '100%' }}
            key={repoObj.id}
            image={repoObj.owner.avatar_url}
            header={repoObj.name}
            meta={repoObj.owner.login}
            description={repoObj.description ? repoObj.description : ''}
          />
        </Link>
      </div>
    ))
    }
  </div>
);

Repos.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      full_name: PropTypes.string.isRequired,
      description: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};

export default Repos;
