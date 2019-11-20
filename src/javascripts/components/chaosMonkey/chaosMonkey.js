import './chaosMonkey.scss';
import $ from 'jquery';
import monkeyImg from './assets/images/chaosMonkey.gif';
import utilities from '../../helpers/utilities';
import staffData from '../../helpers/data/staffData';
import rideData from '../../helpers/data/rideData';

const kidnapStaffUpdater = (staffId, newStaffData) => staffData.updateRole(staffId, newStaffData).then((staff) => staff.data.name).catch((error) => console.error(error));

const kidnapStaff = () => staffData.getStaff().then((allStaff) => {
  const newAllStaff = { ...allStaff };
  const randomStaff = Math.floor(Math.random() * allStaff.length);
  const newAllStaffId = newAllStaff[randomStaff].id;
  const staffName = newAllStaff[randomStaff].name;
  const newStaffData = {
    name: newAllStaff[randomStaff].name,
    age: newAllStaff[randomStaff].age,
    statusId: 'status2',
    role: newAllStaff[randomStaff].role,
    img: newAllStaff[randomStaff].img,
  };
  const domString = `kidnapped ${staffName}`;
  kidnapStaffUpdater(newAllStaffId, newStaffData);
  return domString;
}).catch((error) => console.error(error));

const cron = require('cron');

const chaosMonkeyData = (monkeyDamage) => {
  const domString = `
      <p>The Chaos Monkey has ${monkeyDamage}</p>!
      <img src=${monkeyImg}>`;
  utilities.printToDom('chaosMonkeyData', domString);
  $('.toast').css('z-index', 3000);
  $('.toast').toast('show');
};

const randomMonkeyEvent = () => {
  const attackZone = Math.floor((Math.random() * 3) + 1);
  return attackZone;
};

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

const chaosMonkey = cron.job('27 19 * * 0-6', () => {
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

export default { chaosMonkey, kidnapStaff };
