import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap';

import '../styles/main.scss';

import homepage from './homepage/homepage';

const init = () => {
  homepage.buildHomepageCards();
};

init();
