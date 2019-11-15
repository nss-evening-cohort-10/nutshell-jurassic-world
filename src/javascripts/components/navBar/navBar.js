import './navBar.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import logo from './assets/logo.png';
import googleLogo from './assets/googleLogo.png';
import utilities from '../../helpers/utilities';

const printLogo = () => {
  const domString = `<img src="${logo}" id="logoImg">`;
  utilities.printToDom('brandLogo', domString);
};

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const logoutEvent = () => {
  const logoutButton = $('#logOutButton');
  logoutButton.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        $('#logButtons').removeClass('hide');
        logoutButton.addClass('hide');
      }).catch((error) => console.error(error));
  });
};

const printLoginButton = () => {
  const domString = `<button class="btn btn-dark" id="logInButton"><img src="${googleLogo}"> Login</button>`;
  utilities.printToDom('logButtons', domString);
  $('body').on('click', '#logInButton', signMeIn);
};

export default { printLogo, printLoginButton, logoutEvent };
