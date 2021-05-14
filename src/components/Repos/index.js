import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import './style.scss';

const Repos = ({ list }) => (
  <Card.Group itemsPerRow={3}>
    {
    list.map((repoObj) => (
      <Card
        key={repoObj.id}
        image={repoObj.owner.avatar_url}
        header={repoObj.name}
        meta={repoObj.owner.login}
        description={repoObj.description ? repoObj.description : ''}
      />
    ))
    }
  </Card.Group>
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
