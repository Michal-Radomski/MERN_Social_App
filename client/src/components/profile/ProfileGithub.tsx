import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getGithubRepos} from "../../redux/actions/profile";

const ProfileGithub = ({
  username,
  getGithubRepos,
  repos,
}: {
  username: string;
  getGithubRepos: (arg0: string) => void;
  repos: Repo[];
}) => {
  React.useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos.map((repo: Repo) => (
        <div key={repo.id} className="repo bg-white p-1 my-1">
          <div>
            <h4>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
              <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
              <li className="badge badge-light">Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state: State) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub);
