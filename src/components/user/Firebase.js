import React from 'react';
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDCJr00bBeK0fBXZWA9IkDHSyh1DA-QVCE',
  authDomain: 'applymate-fc379.firebaseapp.com',
  databaseURL: 'https://applymate-fc379.firebaseio.com',
  projectId: 'applymate-fc379',
  storageBucket: '',
  messagingSenderId: '239144843563',
};

const fire = firebase.initializeApp(config);
export default fire;
