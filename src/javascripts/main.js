import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap';
import 'util';
import firebase from 'firebase';
import $ from 'jquery';

import '../styles/main.scss';

import navBar from './components/navBar/navBar';
import authData from './helpers/data/authData';
import apiKeys from './helpers/apiKeys.json';
import homepage from './components/homepage/homepage';
import chaosMonkey from './components/chaosMonkey/chaosMonkey';
import schedule from './components/schedule/schedule';
import dinoAlert from './components/dinoHandlerCount/dinoHandlerCount';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navBar.printLogo();
  navBar.printLoginButton();
  authData.checkLoginStatus();
  navBar.logoutEvent();
  homepage.buildHomepageCards();
  chaosMonkey.chaosMonkey.start();
  $('body').on('click', '#displayOpenShifts', schedule.printOpenSchedule);
  dinoAlert.dinoAlertTimed.start();
};

init();
