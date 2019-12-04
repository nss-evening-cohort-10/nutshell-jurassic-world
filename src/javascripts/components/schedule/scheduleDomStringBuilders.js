import $ from 'jquery';

const fillCalendar = (array) => {
  $('.calCell').css('background-color', 'transparent').html('');
  const calendarNames = [];
  array.forEach((shift) => {
    calendarNames.push(shift.name);
  });
  const distinctNames = new Set(calendarNames);
  distinctNames.forEach((name) => {
    const selectedName = $('#calendarSpecificView').attr('store-id');
    if (selectedName === name) {
      const findCalendarMatches = array.find((x) => x.name === name);
      findCalendarMatches.assignments.forEach((match) => {
        const shiftName = match.shiftDetails.name.split('-');
        const employee = match.shiftDetails.staffName;
        $(`.${shiftName[0]}.${shiftName[1]}`).css('background-color', 'lightslategrey').css('color', 'darkslategrey');
        $(`.${shiftName[0]}.${shiftName[1]}`).html(`<p>${employee}</p>`);
      });
    }
  });
};

const dinoScheduleBuilder = (scheduleArr, calendarArr) => {
  let scheduleString = `
  <div id='dinoSchedulerShifts' class='container'>
  <div class='row d-flex'>
    <h5 class='col-3'>Dinosaur Name</h5>
    <h5 class='col-2'>Day of Week</h5>
    <h5 class='col-2'>Shift Start Time</h5>
    <h5 class='col-2'>Shift End Time</h5>
  </div>
  `;
  scheduleArr.forEach((shift) => {
    scheduleString += `
    <div class='row d-flex allDays ${shift.weekday}'>
      <p class='col-3'>${shift.dinoName}</p>
      <p class='col-2'>${shift.weekday}</p>
      <p class='col-2'>${shift.startTime}</p>
      <p class='col-2'>${shift.endTime}</p>
      <button class='cudButton col-2 assignStaff btn btn-outline-secondary assignDino' id='${shift.dinoId}-split-${shift.id}'>Assign Staff</button>
    </div>
    `;
  });
  scheduleString += '</div><div id="dinoCalendarShifts" class="calendar hide">';
  fillCalendar(calendarArr);
  scheduleString += '</div>';
  return (scheduleString);
};

const rideScheduleBuilder = (scheduleArr, calendarArr) => {
  let scheduleString = `
  <div class='container'>
  <div class='row d-flex'>
    <h5 class='col-3'>Ride Name</h5>
    <h5 class='col-2'>Day of Week</h5>
    <h5 class='col-2'>Shift Start Time</h5>
    <h5 class='col-2'>Shift End Time</h5>
  </div>
  `;
  scheduleArr.forEach((shift) => {
    scheduleString += `
    <div class='row d-flex allDays ${shift.weekday}'>
      <p class='col-3'>${shift.rideName}</p>
      <p class='col-2'>${shift.weekday}</p>
      <p class='col-2'>${shift.startTime}</p>
      <p class='col-2'>${shift.endTime}</p>
      <button class='cudButton col-2 assignStaff btn btn-outline-secondary assignRide' id='${shift.rideId}-split-${shift.id}'>Assign Staff</button>
    </div>
    `;
  });
  scheduleString += '</div><div id="rideCalendarShifts" class="calendar hide">';
  fillCalendar(calendarArr);
  scheduleString += '</div>';
  return (scheduleString);
};

const vendorScheduleBuilder = (scheduleArr, calendarArr) => {
  let scheduleString = `
  <div class='container'>
  <div class='row d-flex'>
    <h5 class='col-3'>Vendor Name</h5>
    <h5 class='col-2'>Day of Week</h5>
    <h5 class='col-2'>Shift Start Time</h5>
    <h5 class='col-2'>Shift End Time</h5>
  </div>
  `;
  scheduleArr.forEach((shift) => {
    scheduleString += `
    <div class='row d-flex allDays ${shift.weekday}'>
      <p class='col-3'>${shift.vendorName}</p>
      <p class='col-2'>${shift.weekday}</p>
      <p class='col-2'>${shift.startTime}</p>
      <p class='col-2'>${shift.endTime}</p>
      <button class='cudButton col-2 assignStaff btn btn-outline-secondary assignVendor' id='${shift.vendorId}-split-${shift.id}'>Assign Staff</button>
    </div>
    `;
  });
  scheduleString += '</div><div id="vendorCalendarShifts" class="calendar hide">';
  fillCalendar(calendarArr);
  scheduleString += '</div>';
  return (scheduleString);
};


export default { rideScheduleBuilder, dinoScheduleBuilder, vendorScheduleBuilder };
