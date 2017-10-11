import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import Resume from './resumeUpload';

class App extends React.Component {
  static GitAuth(e) {
    e.preventDefault();
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        console.log('token', result.credential.accessToken);
        console.log('user', result.user);
      })
      .catch((error) => {
        console.log('Git Auth Error:', error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.TESTBUTTON = this.TESTBUTTON.bind(this);
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

  signUp(e) {
    e.preventDefault();
    if (this.signUpPassword.value === this.signUpPassword2.value) {
      firebase.auth().createUserWithEmailAndPassword(
        this.signUpUsername.value,
        this.signUpPassword.value,
      )
        .then((user) => {
          this.setState({
            user,
          });
          console.log('logged in as:', user);
        })
        .catch((error) => {
          console.error('Firebase Signup Error:', error.code);
          console.error(error.message);
          alert(error.message);
        });
    } else {
      alert('Your passwords do not match.');
    }
  }

  signIn(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(
      this.signInUsername.value,
      this.signInPassword.value,
    )
      .then((user) => {
        this.setState({
          user,
        });
        console.log(console.log('logged in as:', user));
      })
      .catch((error) => {
        console.error('Firebase Sign in Error:', error.code);
        console.error(error.message);
        alert(error.message);
      });
  }

  signOut(e) {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          user: null,
        });
        console.log('Signed out');
      })
      .catch((error) => {
        console.error('Firebase Sign out Error:', error.code);
        console.error(error.message);
        alert(error.message);
      });
  }


  TESTBUTTON(e) {
    e.preventDefault();
    console.log('firebase.auth().currentUser', firebase.auth().currentUser);
    console.log('this.state.user', this.state.user);
  }


  render() {
    return (
      <div id="temp">Hello World
        <form id="signUp" onSubmit={e => this.signUp(e)}>
          <input ref={(input) => { this.signUpUsername = input; }} type="text" placeholder="E-Mail Address" /><br />
          <input ref={(input) => { this.signUpPassword = input; }} type="password" placeholder="Password" /><br />
          <input ref={(input) => { this.signUpPassword2 = input; }} type="password" placeholder="Verify Password" /><br />
          <button type="submit">Sign Up</button>
        </form>
        <br /><br />
        <form id="signIn" onSubmit={e => this.signIn(e)}>
          <input ref={(input) => { this.signInUsername = input; }} type="text" placeholder="E-Mail Address" /> <br />
          <input ref={(input) => { this.signInPassword = input; }} type="password" placeholder="Password" /> <br />
          <button type="submit">Sign In</button>
        </form>
        <br /><br />
        <button id="signOut" onClick={e => this.signOut(e)}>SignOut</button>
        <br />
        <button id="BUTTON" onClick={e => this.TESTBUTTON(e)}>TEST BUTTON</button>
        <br /><br />
      </div>
    );

    this.readPDF = this.readPDF.bind(this);
  }

  readPDF(event) {
    const reader = new FileReader();
    console.log(this);
    reader.onload = () => {
      const { result } = reader;
      axios.post('/api/resume', {
        result,
      });
    };
    reader.readAsBinaryString(event.target.files[0]);
  }

  render() {
    return (<Resume readPDF={this.readPDF} />);
  }
}

export default App;
