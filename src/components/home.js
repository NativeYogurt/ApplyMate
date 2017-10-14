import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './navbar';
import Main from './mainBoard';

function Home(props) {
  return (
    <div>
      <h1>ApplyMate</h1>
      <div className="navHolder">
        <NavBar
          signOut={props.signOut}
          TESTBUTTON={props.TESTBUTTON}
        />
      </div>
      <Main userId={props.user ? props.user.uid : null} />
    </div>);
}
Home.propTypes = {
  signOut: PropTypes.func.isRequired,
  TESTBUTTON: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default Home;
