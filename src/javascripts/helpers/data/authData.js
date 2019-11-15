import firebase from 'firebase/app';
import 'firebase/auth';
import navBar from '../../components/navBar/navBar';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navBar.logInEvent();
    } else {
      navBar.printLoginButton();
    }
  });
};

export default { checkLoginStatus };
