import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import dinosaurs from '../../components/dinos/dinos';

const logInButton = $('#logButtons');
const logOutButton = $('#logOutButton');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      logOutButton.removeClass('hide');
      logInButton.addClass('hide');
      dinosaurs.userModeToggle();
    } else {
      logOutButton.addClass('hide');
      logInButton.removeClass('hide');
      dinosaurs.userModeToggle();
    }
  });
};

export default { checkLoginStatus };
