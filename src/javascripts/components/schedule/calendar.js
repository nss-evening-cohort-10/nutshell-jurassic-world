import './schedule.scss';
import $ from 'jquery';
import scheduleTitle from './assets/images/scheduleTitle.png';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import dinoData from '../../helpers/data/dinoData';
import rideData from '../../helpers/data/rideData';
import vendorData from '../../helpers/data/vendorData';

const printDinoCalendar = (e) => {
  e.stopImmediatePropagation();
  const chosenName = $(e.target).val();
  $('#calendarSpecificView').attr('store-id', chosenName);
  smash.findDinoShifts().then(() => {
  }).catch((err) => console.error(err));
};

const printRideCalendar = (e) => {
  e.stopImmediatePropagation();
  const chosenName = $(e.target).val();
  $('#calendarSpecificView').attr('store-id', chosenName);
  smash.findRideShifts().then(() => {
  }).catch((err) => console.error(err));
};

const printVendorCalendar = (e) => {
  e.stopImmediatePropagation();
  const chosenName = $(e.target).val();
  $('#calendarSpecificView').attr('store-id', chosenName);
  smash.findVendorShifts().then(() => {
  }).catch((err) => console.error(err));
};

const makeCalendarGrid = () => {
  let gridString = `
    <table id='calendarTable' class='table table-bordered text-center'>
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
      gridString += `<td class='day${n} hour${i} calCell'></td>`;
    }
    gridString += '</tr>';
  }
  gridString += '</table>';
  return gridString;
};

const getNameOptions = (e) => new Promise((resolve, reject) => {
  const mainSelection = $(e.target).val();
  dinoData.getDinosaurs().then((allDinos) => {
    rideData.getRides().then((allRides) => {
      vendorData.getAllVendors().then((allVendors) => {
        const specificNames = [];
        if (mainSelection === 'dinosaurs') {
          allDinos.forEach((dino) => {
            specificNames.push(dino.name);
          });
          $('#calendarSpecificView').on('change', printDinoCalendar);
        } else if (mainSelection === 'rides') {
          allRides.forEach((ride) => {
            specificNames.push(ride.name);
          });
          $('#calendarSpecificView').on('change', printRideCalendar);
        } else if (mainSelection === 'vendors') {
          allVendors.forEach((vendor) => {
            specificNames.push(vendor.name);
          });
          $('#calendarSpecificView').on('change', printVendorCalendar);
        }
        resolve(specificNames);
      });
    });
  }).catch((err) => reject(err));
});

const printSpecificViewOptions = (e) => {
  $('#calendarSpecificView').unbind();
  $('.calCell').css('background-color', 'transparent').html('');
  getNameOptions(e).then((specificNamesList) => {
    const mainSelection = $(e.target).val();
    if (mainSelection === 'unselected') {
      $('#calendarSpecificView').attr('disabled', true);
    } else {
      $('#calendarSpecificView').removeAttr('disabled');
    }
    let listString = '<option value="unselected">Choose One...</option>';
    specificNamesList.forEach((name) => {
      listString += `<option value='${name}'>${name}</option>`;
    });
    utilities.printToDom('calendarSpecificView', listString);
  }).catch((err) => console.error(err));
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
  $('.day0').addClass('Sunday');
  $('.day1').addClass('Monday');
  $('.day2').addClass('Tuesday');
  $('.day3').addClass('Wednesday');
  $('.day4').addClass('Thursday');
  $('.day5').addClass('Friday');
  $('.day6').addClass('Saturday');
  $('.hour0, .hour1, .hour2, .hour3, .hour4, .hour5, .hour6, .hour7').addClass('Overnight');
  $('.hour8, .hour9, .hour10, .hour11, .hour12, .hour13, .hour14, .hour15').addClass('Morning');
  $('.hour16, .hour17, .hour18, .hour19, .hour20, .hour21, .hour22, .hour23').addClass('Evening');
};

export default { printCalendarView };
