import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap';
import firebase from 'firebase';

import '../styles/main.scss';
import navBar from './components/navBar/navBar';
import homepage from './components/homepage/homepage';
import authData from './helpers/data/authData';
import vendors from './components/vendors/vendors';

import apiKeys from './helpers/apiKeys.json';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navBar.printLogo();
  navBar.printLoginButton();
  navBar.logoutEvent();
  authData.checkLoginStatus();
  homepage.buildHomepageCards();
  vendors.showAllVendors();
};

init();
