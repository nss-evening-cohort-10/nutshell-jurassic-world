import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap';

import '../styles/main.scss';
import navBar from './components/navBar/navBar';
import homepage from './homepage/homepage';

const init = () => {
  navBar.printLogo();
  navBar.printLoginButton();
  homepage.buildHomepageCards();
};

init();
