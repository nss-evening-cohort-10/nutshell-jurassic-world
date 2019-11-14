import './navBar.scss';
import logo from './assets/logo.png';
import googleLogo from './assets/googleLogo.png';
import utilities from '../../helpers/utilities';

const printLogo = () => {
  const domString = `<img src="${logo}" id="logoImg">`;
  utilities.printToDom('brandLogo', domString);
};

const printLoginButton = () => {
  const domString = `<button class="btn btn-dark" id="logInButton"><img src="${googleLogo}"> Login</button>`;
  utilities.printToDom('logButtons', domString);
};

export default { printLogo, printLoginButton };
