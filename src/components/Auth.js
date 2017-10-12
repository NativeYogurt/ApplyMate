import React from 'react';
import fire from './Firebase.js';
import firebase from 'firebase';

exports.signUp = (user, pass) => {
  fire.auth().createUserWithEmailAndPassword(user, pass)
    .then((newUser) => {
      console.log(newUser);
    })
    .catch((error) => {
      console.error(error.message);
    });
};
exports.signIn = (user, pass) => {
  fire.auth().signInWithEmailAndPassword(user, pass)
    .then((win) => {
      console.log(win);
    })
    .catch((error) => {
      console.error(error.message);
    });
};
exports.signOut = () => {
  fire.auth().signOut()
    .then(() => {
      console.log('signed out');
    })
    .catch((error) => {
      console.error('sign out error', error);
    });
};
exports.gitAuth = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  fire.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('token', result.credential.accessToken)
      console.log('user', result.user)
    })
    .catch((error) => {
      console.log('Git Auth Error:', error.code)
      console.log(error.message)
      console.log(error.email)
      console.log(error.credential)
    });
}