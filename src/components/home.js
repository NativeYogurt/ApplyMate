import React from 'react';

import Nav from './nav.js';
import Main from './mainBoard.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <Nav signOut={this.props.signOut}/>
        <Main />
      </div>);
  }
}

export default Home;
