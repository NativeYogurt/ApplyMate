import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './navbar';
import Main from './mainBoard';

function Home(props) {
  return (
    <div>
      <div className="navHolder">
        <NavBar
          TESTBUTTON={props.TESTBUTTON}
          setUser={props.setUser}
        />
      </div>
      <Main userId={props.user ? props.user.uid : null} />
    </div>);
}
Home.propTypes = {
  setUser: PropTypes.func.isRequired,
  TESTBUTTON: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default Home;
