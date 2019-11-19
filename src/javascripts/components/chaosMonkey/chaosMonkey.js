import './chaosMonkey.scss';
import $ from 'jquery';
import monkeyImg from './assets/images/chaosMonkey.gif';
import utilities from '../../helpers/utilities';
<<<<<<< HEAD
import staffData from '../../helpers/data/staffData';

const kidnapStaff = () => staffData.getStaff().then((allStaff) => {
  let domString = '';
  const newAllStaff = { ...allStaff };
  const randomStaff = Math.floor(Math.random() * allStaff.length);
  if (newAllStaff[randomStaff].statusId === 'status1') {
    newAllStaff[randomStaff].statusId = 'status2';
    const staffName = newAllStaff[randomStaff].name;
    domString += `kidnapped ${staffName}`;
  }
  return domString;
}).catch((error) => console.error(error));
=======
import rideData from '../../helpers/data/rideData';
>>>>>>> master

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

<<<<<<< HEAD
const chaosMonkey = cron.job('45 21 * * 0-6', () => {
=======
const rideUpdater = (rideId, newInfo) => rideData.updateRide(rideId, newInfo).then((ride) => ride.data.name).catch((error) => console.error(error));

const rideBreaker = () => rideData.getRides().then((rides) => {
  const number = rides.length;
  const attackedRide = Math.floor((Math.random() * number));
  const rideId = rides[attackedRide].id;
  const rideName = rides[attackedRide].name;
  const updatedRide = {
    name: `${rides[attackedRide].name}`,
    imgUrl: `${rides[attackedRide].imgUrl}`,
    status: 'status2',
    isExhibit: `${rides[attackedRide].isExhibit}`,
  };
  rideUpdater(rideId, updatedRide);
  return rideName;
}).catch((error) => console.error(error));

const chaosMonkey = cron.job('26 21 * * 0-6', () => {
>>>>>>> master
  const attackZone = randomMonkeyEvent();
  let domString = '';
  if (attackZone === 1) {
    rideBreaker().then((result) => {
      domString = `broken ${result}`;
      chaosMonkeyData(domString);
    }).catch((error) => console.error(error));
  } else if (attackZone === 2) {
    kidnapStaff()
      .then((result) => {
        domString = `${result}`;
        chaosMonkeyData(domString);
      })
      .catch((error) => console.error(error));
  } else if (attackZone === 3) {
    domString = 'fill in staff event';
  }
});

export default { chaosMonkey, rideBreaker };
