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
import equipStaffData from '../../helpers/data/equipStaffData';
import rideStaffData from '../../helpers/data/rideStaffData';
import dinoStaffData from '../../helpers/data/dinoStaffData';
import vendorStaffData from '../../helpers/data/vendorStaffData';

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

const removeStaffConnections = (staffId) => {
  equipStaffData.getEquipStaffbyStaffId(staffId)
    .then((equipStaffs) => {
      if (equipStaffs.length !== 0) {
        equipStaffs.forEach((equipStaff) => {
          equipStaffData.removeEquipStaff(equipStaff.id);
        });
      }
    })
    .catch((error) => console.error(error));
  rideStaffData.getRideStaffByStaffId(staffId)
    .then((rideStaffs) => {
      if (rideStaffs.length !== 0) {
        rideStaffs.forEach((rideStaff) => {
          rideStaffData.removeRideStaff(rideStaff.id);
        });
      }
    })
    .catch((error) => console.error(error));
  dinoStaffData.getDinoStaffbyStaffId(staffId)
    .then((dinoStaffs) => {
      if (dinoStaffs.length !== 0) {
        dinoStaffs.forEach((dinoStaff) => {
          dinoStaffData.removeDinoStaff(dinoStaff.id);
        });
      }
    })
    .catch((error) => console.error(error));
  vendorStaffData.getVendorStaffbyStaffId(staffId)
    .then((vendorStaffs) => {
      if (vendorStaffs.length !== 0) {
        vendorStaffs.forEach((vendorStaff) => {
          vendorStaffData.removeVendorStaff(vendorStaff.id);
        });
      }
    })
    .catch((error) => console.error(error));
};

const kidnapStaff = () => {
  staffData.getLivingStaffMembers()
    .then((allStaff) => {
      const newAllStaff = { ...allStaff };
      const randomStaff = Math.floor(Math.random() * allStaff.length);
      const newAllStaffId = newAllStaff[randomStaff].id;
      const staffName = newAllStaff[randomStaff].name;
      const newStaffData = {
        name: newAllStaff[randomStaff].name,
        isDead: true,
        role: newAllStaff[randomStaff].role,
        imgUrl: newAllStaff[randomStaff].imgUrl,
      };
      const domString = `The Chaos Monkey has kidnapped ${staffName}!`;
      staffData.updateRole(newAllStaffId, newStaffData);
      // eslint-disable-next-line no-use-before-define
      chaosMonkeyData(domString);
      removeStaffConnections(newAllStaffId);
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
  $('#chaosToast').css('z-index', 3000);
  $('#chaosToast').toast('show');
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
        isOperational: false,
        hasDinos: `${rides[attackedRide].hasDinos}`,
      };
      rideUpdater(rideId, updatedRide);
      rideStaffData.findRideStaffByRideId(rideId)
        .then((results) => {
          results.forEach((result) => {
            rideStaffData.removeRideStaff(result);
          });
        })
        .catch((error) => console.error(error));
      const domString = `The Chaos Monkey has broken ${rideName}!`;
      chaosMonkeyData(domString);
      createEntry('', rideId, '', domString, 'zone-1');
      return rideName;
    })
    .catch((error) => console.error(error));
};

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
        isBroken: true,
      };
      equipmentData.updateEquipment(equipId, updatedEquip);
      equipStaffData.findEquipStaffByEquipId(equipId)
        .then((result) => equipStaffData.removeEquipStaff(result))
        .catch((err) => console.error(err));
      const domString = `The Chaos Monkey has destroyed ${equipName}!`;
      chaosMonkeyData(domString);
      createEntry(equipId, '', '', domString, 'zone-3');
      return equipName;
    })
    .catch((error) => console.error(error));
};

const chaosMonkey = cron.job('15-59/8 * * * 0-6', () => {
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
