import vendorStaffData from '../../helpers/data/vendorStaffData';

const assignStaffVendor = (event) => {
  event.stopImmediatePropagation();
  const newVendorStaff = {
    staffId: '',
    vendorId: '',
    shiftId: '',
  };
  vendorStaffData.createNewVendorStaff(newVendorStaff)
    .then()
    .catch((error) => console.error(error));
};

export default { assignStaffVendor };
