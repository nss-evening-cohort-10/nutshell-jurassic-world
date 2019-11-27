import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import './allStaff.scss';
import staffData from '../../helpers/data/staffData';
import utilities from '../../helpers/utilities';
import staffTitle from './assets/images/staffTitle.gif';

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

const fireStaff = (e) => {
  e.preventDefault();
  const staffId = e.target.id.split('fire-')[1];
  staffData.fireStaff(staffId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildAllStaff();
    })
    .catch((error) => console.error(error));
};

const hireStaff = (e) => {
  e.stopImmediatePropagation();
  const newStaff = {
    name: $('#staffName').val(),
    age: $('#staffAge').val(),
    statusId: 'status1',
    role: $('#staffRole').val(),
    img: $('#staffImageURL').val(),
  };
  staffData.hireStaff(newStaff)
    .then(() => {
      $('#staffModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildAllStaff();
    }).catch((error) => console.error(error));
  $('#staffName').val('');
  $('#staffAge').val('');
  $('#staffRole').val('');
  $('#staffImageURL').val('');
};

const updateStaff = (e) => {
  const staffId = e.target.id.split('staff-')[1];
  const newStaffRole = {
    name: $('#updateStaffName').val(),
    age: $('#updateStaffAge').val(),
    statusId: 'status1',
    role: $('#updateStaffRole').val(),
    img: $('#updateStaffImageURL').val(),
  };
  staffData.updateStaff(staffId, newStaffRole)
    .then(() => {
      $('#updateStaffModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildAllStaff();
    })
    .catch((error) => console.error(error));
};

const getStaffUpdate = (e) => {
  $('#updateStaffModal').modal('show');
  const staffId = e.target.id.split('update-')[1];
  staffData.getStaff()
    .then((allStaff) => {
      allStaff.forEach((staff) => {
        if (staff.id === staffId) {
          const newStaffId = `staff-${staff.id}`;
          $('#updateStaffName').val(`${staff.name}`);
          $('#updateStaffAge').val(`${staff.age}`);
          $('#updateStaffRole').val(`${staff.role}`);
          $('#updateStaffImageURL').val(`${staff.img}`);
          $('.updateStaff').attr('id', newStaffId);
        }
      });
    })
    .catch((error) => console.error(error));
};

const buildAllStaff = () => {
  // $('#dinosaurs').addClass('hide');
  // $('#rides').addClass('hide');
  // $('#vendors').addClass('hide');
  // $('#home-page').addClass('hide');
  // $('#equipment').addClass('hide');
  // $('#staff').removeClass('hide');
  staffData.getStaff()
    .then((allStaff) => {
      if (allStaff[0]) {
        let domString = `
        <div class="row justify-content-center" id="dinoTitle"><img src=${staffTitle}></div>
        <div class="d-flex justify-content-center">
        <button href="#" class="btn btn-outline-dark hireButton" hireId="hire"  data-toggle="modal" data-target="#staffModal">Hire</button></div>
        <div id="staffSection" class="container d-flex flex-wrap justify-content-center">
        `;
        allStaff.forEach((staff) => {
          domString += `
        <div class="card staffCard col-3 shadow p-3 mb-5 bg-white rounded" id="${staff.id}">
          <img src="${staff.img}" class="card-img-top staffImg img-responsive" alt="...">
            <div class="card-body">
              <h5 class="card-title">${staff.name}</h5>
              <p class="card-text">${staff.role}</p>
              </div>
              <div class="card-footer d-flex justify-content-between flex-wrap">
                <button href="#" class="btn btn-dark fire hide" id="fire-${staff.id}">Fire</button>
                <button href="#" class="btn btn-dark updateRole hide" id="update-${staff.id}" data-toggle="modal" data-target="#updateStaffModal">Update Role</button>
              </div>
        </div>
        `;
        });
        domString += '</div></div>';
        utilities.printToDom('printComponent', domString);
      }
      staffModeToggle();
      $('.fire').click(fireStaff);
      $('#hireStaff').click(hireStaff);
      $('.updateStaff').click(updateStaff);
      $('.updateRole').click(getStaffUpdate);
    })
    .catch((error) => console.error(error));
};

export default { buildAllStaff, staffModeToggle };
