import './schedule.scss';
import $ from 'jquery';
import scheduleTitle from './assets/images/scheduleTitle.png';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';

const selectTypeView = (e) => {
  const selectedType = $(e.target).val();
  if (selectedType === 'allTypes') {
    $('.allTypes').removeClass('hide');
  } else {
    $('.allTypes').addClass('hide');
    $(`.${selectedType}`).removeClass('hide');
  }
};

const selectDayView = (e) => {
  const selectedDay = $(e.target).val();
  if (selectedDay === 'allDays') {
    $('.allDays').removeClass('hide');
  } else {
    $('.allDays').addClass('hide');
    $(`.${selectedDay}`).removeClass('hide');
  }
};

const printOpenSchedule = () => {
  let scheduleString = `
  <div class="row justify-content-center" id="dinoTitle"><img src=${scheduleTitle}></div>
  <div class='row d-flex'>
    <h2 class='col-2 offset-1'>Open Shifts</h2>
    <form class='row d-flex col-6'>
      <div class="form-group col-4 offset-1">
        <label for="jobTypeSelect">Job Type</label>
        <select class="form-control" id="jobTypeSelect">
          <option value='allTypes'>All</option>
          <option value='dinosaurs'>Dinosaurs</option>
          <option value='rides'>Rides</option>
          <option value='vendors'>Vendors</option>
        </select>
      </div>
      <div class="form-group col-4 offset-1">
        <label for="jobDaySelect">Day of Week</label>
        <select class="form-control" id="jobDaySelect">
          <option value='allDays'>All</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>
      </div>
    </form>
    <button id='displayCalendar' class='hide col-2 btn btn-secondary'>Calendar View</button>
  </div>
  <div id='openRidesSchedule' class='allTypes rides'>
  <h3>Rides</h3>
  <hr>
  `;
  smash.findRideShifts().then((rideString) => {
    scheduleString += `
    ${rideString}
    </div>
    <div id='openVendorsSchedule' class='allTypes vendors'>
    <h3>Vendors</h3>
    <hr>
    `;
    smash.findVendorShifts().then((vendorShifts) => {
      scheduleString += `
      ${vendorShifts}
      </div>
      <div id='openDinosSchedule' class='allTypes dinosaurs'>
      <h3>Dinosaurs</h3>
      <hr>
      `;
      smash.findDinoShifts().then((dinoString) => {
        scheduleString += `
        ${dinoString}
        </div>
        `;
        utilities.printToDom('printComponent', scheduleString);
        $('#jobTypeSelect').change(selectTypeView);
        $('#jobDaySelect').change(selectDayView);
      });
    });
  }).catch((err) => console.error(err));
};

export default { printOpenSchedule };
