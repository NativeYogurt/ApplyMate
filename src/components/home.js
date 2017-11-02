import React from 'react';
import PropTypes from 'prop-types';

import Nav from './navbar';
import Footer from './footer';
import Main from './mainBoard';

const Home = (props) => {
  return (
    <div>
      <div className="navHolder">
        <Nav
          setUser={props.setUser}
          userName={props.user.displayName}
        />
      </div>
      <Main userId={props.user ? props.user.uid : null} />
      <Footer />
    </div>);
};

Home.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Home;
