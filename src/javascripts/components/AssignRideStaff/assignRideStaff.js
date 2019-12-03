import $ from 'jquery';
import './assignRideStaff.scss';
import printSchedule from '../schedule/schedule';
import createNewRideStaff from '../../helpers/data/rideStaffData';

const assignRideStaff = (event) => {
  event.stopImmediatePropagation();
  const rideId = $(event.target).attr('store-ids').split('-split-')[0];
  const shiftId = $(event.target).attr('store-ids').split('-split-')[1];
  const staffId = $('#exampleFormControlSelect1').val();
  const newRideStaff = {
    staffId,
    rideId,
    shiftId,
  };
  createNewRideStaff.createNewRideStaff(newRideStaff)
    .then(() => {
      $('#assignStaffModal').modal('hide');
      $('.add-staff-assignment').removeAttr('id');
      $('.add-staff-assignment').removeAttr('store-ids');
      printSchedule.printOpenSchedule();
    })
    .catch((error) => console.error(error));
};

export default { assignRideStaff };
