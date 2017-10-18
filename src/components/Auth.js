import React from 'react';
import axios from 'axios';
import firebase from 'firebase';
import fire from './Firebase.js';

let pendingCred;
let pendingEmail;

exports.signUp = (user, pass, first, last, cb) => {
  fire.auth().createUserWithEmailAndPassword(user, pass)
    .then((newUser) => {
      axios.post('/api/signUp', {
        data: {
          id: newUser.uid,
          firstName: first,
          lastName: last,
          email: newUser.email,
        },
      })
        .then((res) => {
          cb(undefined, newUser);
        })
        .catch((err) => {
          console.error(err);
        });
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
exports.gitAuth = (cb) => {
  const provider = new firebase.auth.GithubAuthProvider();
  fire.auth().signInWithPopup(provider)
    .then((user) => {
      console.log(user.additionalUserInfo.username)
      axios.post('/api/scanForUser', {
        data: { email: user.user.email },
      })
        .then((result) => {
          if (result.data[0] === undefined) {
            axios.post('/api/signUp', {
              data: {
                id: user.user.uid,
                email: user.user.email,
                githubUsername: user.additionalUserInfo.username,
              },
            })
              .catch(err => alert(err))
          }
        })
        .catch(err => alert(err));
    })
    .catch((error) => {
      pendingCred = error.credential;
      pendingEmail = error.email;
      cb(error);
    });
};
exports.gitAuthMerge = (pass, cb) => {
  fire.auth().fetchProvidersForEmail(pendingEmail)
    .then((providers) => {
      if (providers[0] === 'password') {
        fire.auth().signInWithEmailAndPassword(pendingEmail, pass)
          .then(user => user.linkWithCredential(pendingCred))
          .catch(err => alert(err))
          .then(() => {
            cb();
          })
          .catch(err => alert(err));
      }
    });
};
