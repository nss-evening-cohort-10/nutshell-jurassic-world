import $ from 'jquery';
import './allStaff.scss';
import staffData from '../../helpers/data/staffData';
import staffPrint from '../staff/staff';
import utilities from '../../helpers/utilities';

const buildAllStaffEventHandler = (e) => {
  const staffId = e.target.id;
  console.log(staffId);
  if (staffId === 'staffLink') {
    // eslint-disable-next-line no-use-before-define
    buildAllStaff();
    $('#staff').removeClass('hide');
    $('#home-page').addClass('hide');
  } else {
    $('#staff').addClass('hide');
  }
};

const buildAllStaff = () => {
  staffData.getStaff()
    .then((allStaff) => {
      let domString = '<div id="staffSection" class="d-flex flex-wrap">';
      allStaff.forEach((staff) => {
        domString += staffPrint.makeStaff(staff);
      });
      domString += '</div>';
      utilities.printToDom('staff', domString);
      $(document).on('click', '#staffLink', buildAllStaffEventHandler);
    })
    .catch((error) => console.error(error));
};

export default { buildAllStaff };
