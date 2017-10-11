import React from 'react';
import firebase from 'firebase';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyDCJr00bBeK0fBXZWA9IkDHSyh1DA-QVCE',
      authDomain: 'applymate-fc379.firebaseapp.com',
      databaseURL: 'https://applymate-fc379.firebaseio.com',
      projectId: 'applymate-fc379',
      storageBucket: '',
      messagingSenderId: '239144843563',
    };

    firebase.initializeApp(config);
  }

  render() {
    return (
      <div id="temp">Hello World
        <form id="signIn" onSubmit={e => this.props.signIn(e)}>
          <input ref={(input) => { this.signInUsername = input; }} type="text" placeholder="E-Mail Address" /> <br />
          <input ref={(input) => { this.signInPassword = input; }} type="password" placeholder="Password" /> <br />
          <button type="submit">Sign In</button>
        </form>
        <br /><br />
        <button id="signOut" onClick={e => this.props.signOut(e)}>SignOut</button>
        <br />
        <button id="BUTTON" onClick={e => this.props.TESTBUTTON(e)}>TEST BUTTON</button>
        <br /><br />
      </div>
    );
  }
}

export default Login;
