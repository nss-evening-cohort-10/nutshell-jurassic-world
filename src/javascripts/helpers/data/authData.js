import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';


const checkForUser = () => {
  if (firebase.auth().currentUser) {
    $('.cudButton').removeClass('hide');
    $('#logOutButton').removeClass('hide');
    $('#logInButton').addClass('hide');
  } else {
    $('.cudButton').addClass('hide');
    $('#logOutButton').addClass('hide');
    $('#logInButton').removeClass('hide');
  }
};

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('.cudButton').removeClass('hide');
      $('#logOutButton').removeClass('hide');
      $('#logInButton').addClass('hide');
    } else {
      $('.cudButton').addClass('hide');
      $('#logOutButton').addClass('hide');
      $('#logInButton').removeClass('hide');
    }
  });
};


export default { checkForUser, checkLoginStatus };
