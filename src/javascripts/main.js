import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap';
import firebase from 'firebase';

import '../styles/main.scss';
import navBar from './components/navBar/navBar';
import authData from './helpers/data/authData';

import apiKeys from './helpers/apiKeys.json';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navBar.printLogo();
  authData.checkLoginStatus();
};

init();
