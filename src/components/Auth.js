import React from 'react';
import fire from './Firebase.js';
import firebase from 'firebase';
import axios from 'axios'
exports.signUp = (user, pass, first, last, cb) => {
  fire.auth().createUserWithEmailAndPassword(user, pass)
    .then((newUser) => {
      cb(undefined, newUser);
      axios.post('/api/signUp', {
        data: {
          id: newUser.uid,
          firstName: first,
          lastName: last,
          email: newUser.email,
        },
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.error(err);
        })
    })
    .catch((error) => {
      cb(error.message);
    });
};
exports.signIn = (user, pass, cb) => {
  fire.auth().signInWithEmailAndPassword(user, pass)
    .then((win) => {
      cb(undefined, win);
    })
    .catch((error) => {
      cb(error.message);
    });
};
exports.signOut = (cb) => {
  fire.auth().signOut()
    .then(() => {
      cb(undefined, null);
    })
    .catch((error) => {
      cb(error);
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