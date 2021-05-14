import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import './style.scss';

const SingleRepo = ({ activeRepo }) => (
  <div className="single-repo">
    <h1>{ activeRepo.name.toUpperCase() }</h1>
    <p>Retrouvez tous les détails sur ${activeRepo.full_name}</p>
    <h2>Organisation</h2>
    <div className="owner">
      <img className="owner-avatar" alt="avatar" src={activeRepo.owner.avatar_url} />
      <p className="owner-login">{ activeRepo.owner.login }</p>
      <Button
        basic
        content="Voir l'organisation"
        href={activeRepo.owner.html_url}
      />
    </div>
    <h2>Informations générales</h2>
    <p className="repo-description">
      { activeRepo.description }
    </p>
    <Button
      basic
      content="Voir le repo"
      href={activeRepo.html_url}
    />
    <h2>Contenus</h2>

  </div>
);

SingleRepo.propTypes = {
  activeRepo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
      html_url: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default SingleRepo;
