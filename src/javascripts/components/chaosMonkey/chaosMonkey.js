import './chaosMonkey.scss';
import $ from 'jquery';
import monkeyImg from './assets/images/chaosMonkey.gif';
import utilities from '../../helpers/utilities';
import rideData from '../../helpers/data/rideData';
import equipmentData from '../../helpers/data/equipmentData';

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

const equipUpdater = () => console.log('yes');

const equipBreaker = () => equipmentData.getEquipmentData().then((equipments) => {
  const number = equipments.length;
  const attackedEquip = Math.floor((Math.random() * number));
  const equipId = equipments[attackedEquip].id;
  const equipName = equipments[attackedEquip].type;
  const updatedEquip = {
    type: `${equipments[attackedEquip].type}`,
    description: `${equipments[attackedEquip].description}`,
    status: 'status2',
    quantity: `${equipments[attackedEquip].quantity}`,
  };
  equipUpdater(equipId, updatedEquip);
  return equipName;
}).catch((error) => console.error(error));

const chaosMonkey = cron.job('26 21 * * 0-6', () => {
  const attackZone = randomMonkeyEvent();
  let domString = '';
  if (attackZone === 1) {
    rideBreaker().then((result) => {
      domString = `broken ${result}`;
      chaosMonkeyData(domString);
    }).catch((error) => console.error(error));
  } else if (attackZone === 2) {
    domString = 'fill in equipment event';
  } else if (attackZone === 3) {
    equipBreaker();
    domString = 'fill in staff event';
  }
});

export default { chaosMonkey, rideBreaker };
