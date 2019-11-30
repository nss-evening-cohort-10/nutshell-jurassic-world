const dinoScheduleBuilder = (scheduleArr, calendarArr) => {
  let scheduleString = `
  <div class='row d-flex'>
    <h5 class='col-3'>Dinosaur Name</h5>
    <h5 class='col-2'>Day of Week</h5>
    <h5 class='col-2'>Shift Start Time</h5>
    <h5 class='col-2'>Shift End Time</h5>
  </div>
  `;
  scheduleArr.forEach((shift) => {
    scheduleString += `
    <div class='row d-flex'>
      <p class='col-3'>${shift.dinoName}</p>
      <p class='col-2'>${shift.weekday}</p>
      <p class='col-2'>${shift.startTime}</p>
      <p class='col-2'>${shift.endTime}</p>
      <button class='cudButton col-2 btn btn-outline-secondary' id='${shift.dinoId}-split-${shift.id}'>Assign Staff</button>
    </div>
    `;
  });
  scheduleString += '<div id="dinoCalendarShifts" class="calendar hide">';
  calendarArr.forEach((shift) => {
    scheduleString += `<p>calendar ${shift.name}</p>`;
  });
  scheduleString += '</div>';
  return (scheduleString);
};

const rideScheduleBuilder = (scheduleArr, calendarArr) => {
  let scheduleString = `
  <div class='row d-flex'>
    <h5 class='col-3'>Ride Name</h5>
    <h5 class='col-2'>Day of Week</h5>
    <h5 class='col-2'>Shift Start Time</h5>
    <h5 class='col-2'>Shift End Time</h5>
  </div>
  `;
  scheduleArr.forEach((shift) => {
    scheduleString += `
    <div class='row d-flex'>
      <p class='col-3'>${shift.rideName}</p>
      <p class='col-2'>${shift.weekday}</p>
      <p class='col-2'>${shift.startTime}</p>
      <p class='col-2'>${shift.endTime}</p>
      <button class='cudButton col-2 btn btn-outline-secondary' id='${shift.rideId}-split-${shift.id}'>Assign Staff</button>
    </div>
    `;
  });
  scheduleString += '<div id="rideCalendarShifts" class="calendar hide">';
  calendarArr.forEach((shift) => {
    scheduleString += `<p>calendar ${shift.name}</p>`;
  });
  scheduleString += '</div>';
  return (scheduleString);
};

const vendorScheduleBuilder = (scheduleArr, calendarArr) => {
  let scheduleString = `
  <div class='row d-flex'>
    <h5 class='col-3'>Vendor Name</h5>
    <h5 class='col-2'>Day of Week</h5>
    <h5 class='col-2'>Shift Start Time</h5>
    <h5 class='col-2'>Shift End Time</h5>
  </div>
  `;
  scheduleArr.forEach((shift) => {
    scheduleString += `
    <div class='row d-flex'>
      <p class='col-3'>${shift.vendorName}</p>
      <p class='col-2'>${shift.weekday}</p>
      <p class='col-2'>${shift.startTime}</p>
      <p class='col-2'>${shift.endTime}</p>
      <button class='cudButton col-2 btn btn-outline-secondary' id='${shift.vendorId}-split-${shift.id}'>Assign Staff</button>
    </div>
    `;
  });
  scheduleString += '<div id="vendorCalendarShifts" class="calendar hide">';
  calendarArr.forEach((shift) => {
    scheduleString += `<p>calendar ${shift.name}</p>`;
  });
  scheduleString += '</div>';
  return (scheduleString);
};


export default { rideScheduleBuilder, dinoScheduleBuilder, vendorScheduleBuilder };
