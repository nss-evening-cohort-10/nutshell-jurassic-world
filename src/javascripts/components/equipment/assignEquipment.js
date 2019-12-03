import $ from 'jquery';
import equipStaffData from '../../helpers/data/equipStaffData';
import equipment from './equipment';

const assignEquipStaff = (e) => {
  e.stopImmediatePropagation();
  const equipmentId = $(e.target).attr('store-ids');
  const staffId = $('#exampleFormControlSelect1').val();
  const newEquipStaff = {
    equipmentId,
    staffId,
  };
  equipStaffData.createEquipStaff(newEquipStaff)
    .then(() => {
      $('#assignStaffModal').modal('hide');
      $('.add-staff-assignment').removeAttr('id');
      $('.add-staff-assignment').removeAttr('store-ids');
      equipment.printEquipment();
    })
    .catch((error) => console.error(error));
};

export default { assignEquipStaff };
