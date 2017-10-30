import React from 'react';
import PropTypes from 'prop-types';

import Nav from './navbar';
import Main from './mainBoard';

function Home(props) {
  return (
    <div>
      <div className="navHolder">
        <Nav
          setUser={props.setUser}
        />
      </div>
      <Main userId={props.user ? props.user.uid : null} />
    </div>);
}
Home.propTypes = {
  setUser: PropTypes.func.isRequired,
};
export default Home;
