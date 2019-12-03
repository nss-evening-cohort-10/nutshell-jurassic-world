import $ from 'jquery';
import dinoStaffData from '../../helpers/data/dinoStaffData';
import schedule from '../schedule/schedule';

const assignStaffDino = (event) => {
  event.stopImmediatePropagation();
  const dinoId = $(event.target).attr('store-ids').split('-split-')[0];
  const shiftId = $(event.target).attr('store-ids').split('-split-')[1];
  const staffId = $('#exampleFormControlSelect1').val();
  const newDinoStaff = {
    staffId,
    dinoId,
    shiftId,
  };
  dinoStaffData.createNewDinoStaff(newDinoStaff)
    .then(() => {
      $('#assignStaffModal').modal('hide');
      schedule.printOpenSchedule();
    })
    .catch((error) => console.error(error));
};

export default { assignStaffDino };
