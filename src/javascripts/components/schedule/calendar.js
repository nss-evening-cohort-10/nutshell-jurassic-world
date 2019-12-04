import './schedule.scss';
import $ from 'jquery';
import scheduleTitle from './assets/images/scheduleTitle.png';
// import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import dinoData from '../../helpers/data/dinoData';
import rideData from '../../helpers/data/rideData';
import vendorData from '../../helpers/data/vendorData';

const makeCalendarGrid = () => {
  let gridString = `
    <table class='table'>
      <tr>
        <th scope="col">Time</th>
        <th scope="col">Sunday</th>
        <th scope="col">Monday</th>
        <th scope="col">Tuesday</th>
        <th scope="col">Wednesday</th>
        <th scope="col">Thursday</th>
        <th scope="col">Friday</th>
        <th scope="col">Saturday</th>
      </tr>
      `;
  for (let i = 0; i < 24; i += 1) {
    gridString += `<tr> <td scope='row'>${i}:00</td>`;
    for (let n = 0; n < 7; n += 1) {
      gridString += `<td class='day${n} hour${i}'></td>`;
    }
    gridString += '</tr>';
  }
  gridString += '</table>';
  return gridString;
};

const printSpecificViewOptions = (e) => {
  const mainSelection = $(e.target).val();
  const specificNames = [];
  if (mainSelection === 'dinosaurs') {
    dinoData.getDinosaurs().then((allDinos) => {
      allDinos.forEach((dino) => {
        specificNames.push(dino.name);
      });
    }).catch((err) => console.error(err));
  } else if (mainSelection === 'rides') {
    rideData.getRides().then((allRides) => {
      allRides.forEach((ride) => {
        specificNames.push(ride.name);
      });
    }).catch((err) => console.error(err));
  } else if (mainSelection === 'vendors') {
    vendorData.getAllVendors().then((allVendors) => {
      allVendors.forEach((vendor) => {
        specificNames.push(vendor.name);
      });
    }).catch((err) => console.error(err));
  }
  console.log(specificNames);
  $('#calendarSpecificView').removeAttr('disabled');
  let listString = '<option value="test">Choose One...</option>';
  specificNames.forEach((name) => {
    listString += `<option value='${name}'>${name}</option>`;
    console.log('anything');
  });
  utilities.printToDom('calendarSpecificView', listString);
};

const printCalendarView = () => {
  let calendarString = `
  <div class="row justify-content-center" id="dinoTitle"><img src=${scheduleTitle}></div>
  <div class='row d-flex'>
    <h2 class='col-3 offset-1'>Scheduled Shifts</h2>
    <form class='row d-flex col-6'>
      <div class="form-group col-3 offset-1">
        <label for="calendarTypeSelect">Job Type</label>
        <select class="form-control" id="calendarTypeSelect">
          <option value='unselected'>Choose one...</option>
          <option value='dinosaurs'>Dinosaurs</option>
          <option value='rides'>Rides</option>
          <option value='vendors'>Vendors</option>
        </select>
      </div>
      <div class="form-group col-3 offset-1">
        <label for="calendarSpecificView">Name</label>
        <select class="form-control" id="calendarSpecificView" disabled>
          <option value='unselected'>Choose One...</option>
        </select>
      </div>
    </form>
    <button id='displayOpenShifts' class='col-2 btn btn-secondary'>Open Shifts View</button>
  </div>
  <div class='mt-5' id='calendar'>
  `;
  calendarString += makeCalendarGrid();
  calendarString += '</div>';
  utilities.printToDom('printComponent', calendarString);
  $('#calendarTypeSelect').change(printSpecificViewOptions);
};

export default { printCalendarView };
