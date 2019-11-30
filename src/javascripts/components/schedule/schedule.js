import './schedule.scss';
import scheduleTitle from './assets/images/scheduleTitle.png';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';

const printOpenSchedule = () => {
  let scheduleString = `
  <div class="row justify-content-center" id="dinoTitle"><img src=${scheduleTitle}></div>
  <div class='container'>
  <h2 class='text-center'>Open Shifts</h2>
  </div>
  <h3>Rides</h3>
  <div id='openRidesSchedule' class='container'>
  `;
  smash.findRideShifts().then((rideString) => {
    scheduleString += `
    ${rideString}
    </div>
    <h3>Vendors</h3>
    <div id='openVendorsSchedule' class='container'>
    </div>
    <h3>Dinosaurs</h3>
    <div id='openDinosSchedule' class='container'>
    `;
    smash.findDinoShifts().then((dinoString) => {
      scheduleString += `
      ${dinoString}
      </div>
      `;
      utilities.printToDom('printComponent', scheduleString);
    });
  }).catch((err) => console.error(err));
};

export default { printOpenSchedule };
