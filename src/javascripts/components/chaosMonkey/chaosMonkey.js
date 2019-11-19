import './chaosMonkey.scss';
import $ from 'jquery';
import monkeyImg from './assets/images/chaosMonkey.gif';
import utilities from '../../helpers/utilities';


const cron = require('cron');

const chaosMonkeyData = (monkeyDamage) => {
  const domString = `
      <p>The Chaos Monkey has ${monkeyDamage}</p>!
      <img src=${monkeyImg}>`;
  utilities.printToDom('chaosMonkeyData', domString);
  $('.toast').toast('show');
};

const randomMonkeyEvent = () => {
  const attackZone = Math.floor((Math.random() * 3) + 1);
  return attackZone;
};

const chaosMonkey = cron.job('40 19 * * 0-6', () => {
  const attackZone = randomMonkeyEvent();
  let domString = '';
  if (attackZone === 1) {
    domString = 'fill in ride event';
  } else if (attackZone === 2) {
    domString = 'fill in equipment event';
  } else if (attackZone === 3) {
    domString = 'fill in staff event';
  }
  chaosMonkeyData(domString);
});

export default { chaosMonkey };
