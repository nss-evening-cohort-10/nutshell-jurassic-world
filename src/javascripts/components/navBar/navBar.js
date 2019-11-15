import './navBar.scss';
import $ from 'jquery';
import logo from './assets/logo.png';
import googleLogo from './assets/googleLogo.png';
import utilities from '../../helpers/utilities';

const printLogo = () => {
  const domString = `<img src="${logo}" id="logoImg">`;
  utilities.printToDom('brandLogo', domString);
};

const logInEvent = () => {
  const domString = '<button class="btn btn-dark" id="logOutButton">Logout</button>';
  utilities.printToDom('logButtons', domString);
  // eslint-disable-next-line no-use-before-define
  $('body').on('click', '#logOutButton', printLoginButton);
};

const printLoginButton = () => {
  const domString = `<button class="btn btn-dark" id="logInButton"><img src="${googleLogo}"> Login</button>`;
  utilities.printToDom('logButtons', domString);
  $('body').on('click', '#logInButton', logInEvent);
};

export default { printLogo, printLoginButton };
