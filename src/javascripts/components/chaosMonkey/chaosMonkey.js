import './chaosMonkey.scss';
import $ from 'jquery';
import moment from 'moment';
import monkeyImg from './assets/images/chaosMonkey.gif';
import utilities from '../../helpers/utilities';
import staffData from '../../helpers/data/staffData';
import rideData from '../../helpers/data/rideData';
import equipmentData from '../../helpers/data/equipmentData';
import chaosLogData from '../../helpers/data/chaosLogData';
import homepage from '../homepage/homepage';

const kidnapStaffUpdater = (staffId, newStaffData) => staffData.updateRole(staffId, newStaffData).then((staff) => staff.data.name).catch((error) => console.error(error));

const createEntry = (equipId, ride, staff, incidentDesc, zone) => {
  const newLogEntry = {
    dateTime: `${moment().format('LLL')}`,
    equipmentId: equipId,
    incidentDescription: incidentDesc,
    rideId: ride,
    staffId: staff,
    zoneId: zone,
  };
  chaosLogData.addChaosLogEntry(newLogEntry)
    .then(() => homepage.buildHomepageCards())
    .catch((error) => console.error(error));
};

const kidnapStaff = () => {
  staffData.getStaff()
    .then((allStaff) => {
      const newAllStaff = { ...allStaff };
      const randomStaff = Math.floor(Math.random() * allStaff.length);
      const newAllStaffId = newAllStaff[randomStaff].id;
      const staffName = newAllStaff[randomStaff].name;
      const newStaffData = {
        name: newAllStaff[randomStaff].name,
        age: newAllStaff[randomStaff].age,
        role: newAllStaff[randomStaff].role,
        imgUrl: newAllStaff[randomStaff].imgUrl,
      };
      const domString = `The Chaos Monkey has kidnapped ${staffName}!`;
      kidnapStaffUpdater(newAllStaffId, newStaffData);
      // eslint-disable-next-line no-use-before-define
      chaosMonkeyData(domString);
      createEntry('', '', newAllStaffId, domString, 'zone-2');
      return domString;
    })
    .catch((error) => console.error(error));
};

const cron = require('cron');

const chaosMonkeyData = (monkeyDamage) => {
  const domString = `
      <p> ${monkeyDamage}</p>
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

const rideBreaker = () => {
  rideData.getRides()
    .then((rides) => {
      const number = rides.length;
      const attackedRide = Math.floor((Math.random() * number));
      const rideId = rides[attackedRide].id;
      const rideName = rides[attackedRide].name;
      const updatedRide = {
        name: `${rides[attackedRide].name}`,
        imgUrl: `${rides[attackedRide].imgUrl}`,
      };
      rideUpdater(rideId, updatedRide);
      const domString = `The Chaos Monkey has broken ${rideName}!`;
      chaosMonkeyData(domString);
      createEntry('', rideId, '', domString, 'zone-1');
      return rideName;
    })
    .catch((error) => console.error(error));
};

const equipUpdater = (equipId, updatedEquip) => equipmentData.updateEquipment(equipId, updatedEquip).then((equipment) => equipment.data.type).catch((error) => console.error(error));

const equipBreaker = () => {
  equipmentData.getEquipmentData()
    .then((equipments) => {
      const number = equipments.length;
      const attackedEquip = Math.floor((Math.random() * number));
      const equipId = equipments[attackedEquip].id;
      const equipName = equipments[attackedEquip].type;
      const updatedEquip = {
        type: `${equipments[attackedEquip].type}`,
        description: `${equipments[attackedEquip].description}`,
      };
      equipUpdater(equipId, updatedEquip);
      const domString = `The Chaos Monkey has destroyed ${equipName}!`;
      chaosMonkeyData(domString);
      createEntry(equipId, '', '', domString, 'zone-3');

      return equipName;
    })
    .catch((error) => console.error(error));
};

const chaosMonkey = cron.job('2-59/30 4-23 * * 0-6', () => {
  const attackZone = randomMonkeyEvent();
  if (attackZone === 1) {
    rideBreaker();
  } else if (attackZone === 2) {
    kidnapStaff();
  } else if (attackZone === 3) {
    equipBreaker();
  }
});

export default { chaosMonkey, kidnapStaff };
