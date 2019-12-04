import './schedule.scss';
import $ from 'jquery';
import scheduleTitle from './assets/images/scheduleTitle.png';
// import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';

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
  if (mainSelection === 'dinosaurs') {
    console.log('dinosaurs');
  } else if (mainSelection === 'rides') {
    console.log('rides');
  } else if (mainSelection === 'vendors') {
    console.log('vendors');
  }
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
