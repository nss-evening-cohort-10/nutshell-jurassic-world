import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap';

import '../styles/main.scss';
import navBar from './components/navBar/navBar';

const init = () => {
  navBar.printLogo();
  navBar.printLoginButton();
};

init();
