import React from 'react';

import NavBar from './navbar.js';
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
        <h1>ApplyMate</h1>
        <div className="navHolder">
          <NavBar
            history={this.props.history}
            signOut={this.props.signOut}
          />
        </div>
        <Main userId={this.props.user.uid}/>
      </div>);
  }
}

export default Home;
