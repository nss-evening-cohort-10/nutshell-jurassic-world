import './chaosMonkey.scss';
import $ from 'jquery';
import monkeyImg from './assets/images/chaosMonkey.gif';
import utilities from '../../helpers/utilities';
import staffData from '../../helpers/data/staffData';

const kidnapStaff = () => {
  let domString = '';
  staffData.getStaff()
    .then((allStaff) => {
      const newAllStaff = { ...allStaff };
      const randomStaff = Math.floor(Math.random() * allStaff.length);
      if (newAllStaff[randomStaff].statusId === 'status1') {
        newAllStaff[randomStaff].statusId = 'status2';
        const staffName = newAllStaff[randomStaff].name;
        domString += `kidnapped ${staffName}`;
      }
      return domString;
    })
    .catch((error) => console.error(error));
};

const cron = require('cron');

const chaosMonkeyData = (monkeyDamage) => {
  const domString = `
      <p>The Chaos Monkey has ${monkeyDamage}</p>!
      <img src=${monkeyImg}>`;
  utilities.printToDom('chaosMonkeyData', domString);
  $('.toast').toast('show');
};

const randomMonkeyEvent = () => {
  // const attackZone = Math.floor((Math.random() * 3) + 1);
  const attackZone = 2;
  return attackZone;
};

const chaosMonkey = cron.job('18 21 * * 0-6', () => {
  const attackZone = randomMonkeyEvent();
  const kindappingStaff = kidnapStaff();
  let domString = '';
  if (attackZone === 1) {
    domString = 'fill in ride event';
  } else if (attackZone === 2) {
    domString = kindappingStaff;
  } else if (attackZone === 3) {
    domString = 'fill in staff event';
  }
  chaosMonkeyData(domString);
});

export default { chaosMonkey };
