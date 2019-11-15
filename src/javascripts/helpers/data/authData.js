import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const logInButton = $('#logButtons');
const logOutButton = $('#logOutButton');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      logOutButton.removeClass('hide');
      logInButton.addClass('hide');
    } else {
      logOutButton.addClass('hide');
      logInButton.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
