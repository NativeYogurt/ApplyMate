import React from 'react';
import firebase from 'firebase';

class Signup extends React.Component {
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
        <form id="signUp" onSubmit={e => this.props.signUp(e)}>
          <input ref={(input) => { this.signUpUsername = input; }} type="text" placeholder="E-Mail Address" /><br />
          <input ref={(input) => { this.signUpPassword = input; }} type="password" placeholder="Password" /><br />
          <input ref={(input) => { this.signUpPassword2 = input; }} type="password" placeholder="Verify Password" /><br />
          <button type="submit">Sign Up</button>
        </form>
        <br />
        <button id="BUTTON" onClick={e => this.props.TESTBUTTON(e)}>TEST BUTTON</button>
        <br /><br />
      </div>
    );
  }
}

export default Signup;
