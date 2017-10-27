import React from 'react';
import PropTypes from 'prop-types';

import Nav from './navbar';
import Main from './mainBoard';

function Home(props) {
  return (
    <div>
      <div className="navHolder">
        <Nav
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
};
export default Home;
