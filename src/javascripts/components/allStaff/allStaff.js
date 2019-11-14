import './allStaff.scss';
import staffData from '../../helpers/data/staffData';
import staffPrint from '../staff/staff';

const buildAllStaff = () => {
  staffData.getStaff()
    .then((allStaff) => {
      let domString = '<div id="staffSection" class="d-flex flex-wrap"';
      allStaff.forEach((staff) => {
        domString += staffPrint.makeStaff(staff);
      });
      domString += '</div>';
      utilities.printToDom('staff', domString);
    })
    .catch((error) => console.error(error));
};

export default { buildAllStaff };
