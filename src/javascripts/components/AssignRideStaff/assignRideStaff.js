import './assignRideStaff.scss';
import printSchedule from '../schedule/schedule';
import createNewRideStaff from '../../helpers/data/rideStaffData';

const assignRideStaff = (e) => {
  e.stopImmediatePropagation();
  const newRideStaff = {
    staffIdf6ttygyty
    rideId
    shiftId
  };
  createNewRideStaff.createNewRideStaff(newRideStaff)
    .then(() => {
      $('#assignStaffModal').modal('hide');
      printSchedule.printOpenSchedule();
    })
    .catch((error) => console.error(error));
};

export default { assignRideStaff };
