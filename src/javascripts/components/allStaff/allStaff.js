import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import './allStaff.scss';
import staffData from '../../helpers/data/staffData';
import utilities from '../../helpers/utilities';

const staffModeToggle = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    $('.hireButton').removeClass('hide');
    $('.fire').removeClass('hide');
    $('.updateRole').removeClass('hide');
  } else {
    $('.hireButton').addClass('hide');
    $('.fire').addClass('hide');
    $('.updateRole').addClass('hide');
  }
};

const buildAllStaff = () => {
  $('#dinosaurs').addClass('hide');
  $('#rides').addClass('hide');
  $('#vendors').addClass('hide');
  $('#home-page').addClass('hide');
  $('#staff').removeClass('hide');
  staffData.getStaff()
    .then((allStaff) => {
      let domString = '<button href="#" class="btn btn-primary hireButton">Hire</button>';
      domString += '<div id="staffSection" class="d-flex flex-wrap">';
      allStaff.forEach((staff) => {
        domString += `
        <div class="card col-4 d-flex" id="${staff.id}">
          <img src="${staff.img}" class="card-img-top staffImg img-responsive" alt="...">
            <div class="card-body">
              <h5 class="card-title">${staff.name}</h5>
              <p class="card-text">${staff.role}</p>
              <button href="#" class="btn btn-danger fire hide">Fire</button>
              <button href="#" class="btn btn-success updateRole hide">Update Role</button>
            </div>
        </div>
        `;
      });
      domString += '</div>';
      utilities.printToDom('staff', domString);
      staffModeToggle();
    })
    .catch((error) => console.error(error));
};

export default { buildAllStaff, staffModeToggle };
