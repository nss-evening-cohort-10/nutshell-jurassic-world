import $ from 'jquery';
import vendorStaffData from '../../helpers/data/vendorStaffData';
import schedule from '../schedule/schedule';

const assignStaffVendor = (event) => {
  event.stopImmediatePropagation();
  const vendorId = $(event.target).attr('store-ids').split('-split-')[0];
  const shiftId = $(event.target).attr('store-ids').split('-split-')[1];
  const staffId = $('#exampleFormControlSelect1').val();
  const newVendorStaff = {
    staffId,
    vendorId,
    shiftId,
  };
  vendorStaffData.createNewVendorStaff(newVendorStaff)
    .then(() => {
      $('#assignStaffModal').modal('hide');
      schedule.printOpenSchedule();
    })
    .catch((error) => console.error(error));
};

export default { assignStaffVendor };
