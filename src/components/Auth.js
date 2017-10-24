import React from 'react';
import axios from 'axios';
import firebase from 'firebase';
import fire from './Firebase.js';

// sign up using email and password
exports.signUp = (user, pass, first, last, cb) => {
  fire.auth().createUserWithEmailAndPassword(user, pass)
    .then((firebaseUser) => {
      axios.post('/api/signUp', {
        data: {
          id: firebaseUser.uid,
          firstName: first,
          lastName: last,
          email: firebaseUser.email,
        },
      })
        .then((DBUser) => {
          cb(undefined, firebaseUser)
        })
        .catch((err) => {
          cb(err);
        });
    })
    .catch((error) => {
      cb(error);
    });
};
// signing in with email and password
exports.signIn = (user, pass, cb) => {
  fire.auth().signInWithEmailAndPassword(user, pass)
    .then((win) => {
      cb(undefined, win);
    })
    .catch((error) => {
      cb(error.message);
    });
};
// general sign out
exports.signOut = (cb) => {
  fire.auth().signOut()
    .then((firebaseUser) => {
      // passing in null to set current user to null
      cb(undefined, null);
    })
    .catch((error) => {
      cb(error);
    });
};
// signing in with Github
exports.gitAuth = (cb) => {
  const provider = new firebase.auth.GithubAuthProvider();
  fire.auth().signInWithPopup(provider)
    .then((githubUser) => {
      axios.post('/api/scanForUser', {
        data: { email: githubUser.user.email },
      })
        .then((result) => {
          // checking database if user exists
          if (result.data.email === undefined) {
            // if not, put them in the database
            axios.post('/api/signUp', {
              // githubUser.user is the firebase user entry
              data: {
                id: githubUser.user.uid,
                email: githubUser.user.email,
                githubUsername: githubUser.additionalUserInfo.username,
              },
            })
              .then((data) => {
                cb(undefined, githubUser)
              })
              .catch(err => alert(err))
          // if yes, sign them in
          } else {
            cb(undefined, githubUser);
          }
        })
        .catch(err => alert(err));
    })
    // if signing in with Github when signed up with email, 
    // error gets thrown to front end
    .catch((error) => {
      const errCred = error.credential;
      const errEmail = error.email;
      cb(error, undefined, errCred, errEmail);
    });
};
// after dealing with the error above, we merge the accounts here
exports.gitAuthMerge = (pass, errCred, errEmail, cb) => {
  fire.auth().fetchProvidersForEmail(errEmail)
    .then((providers) => {
      if (providers[0] === 'password') {
        fire.auth().signInWithEmailAndPassword(errEmail, pass)
          .then((user) => {
            user.linkWithCredential(errCred)
              .then((firebaseUserwithProviderData) => {
                axios.post('/api/githubUidLookup', {
                  data: { uid: firebaseUserwithProviderData.providerData[0].uid }
                })
                  .then((result) => {
                    // updates database entry to include github username
                    axios.put('/api/updateUser', {
                      userId: user.uid,
                      githubUsername: result.data,
                    })
                      .then(() => cb())
                      .catch(err => alert(err))
                  })
              })
              .catch(err => alert(err))
          })
          .catch(err => alert(err))
      }
    });
};
