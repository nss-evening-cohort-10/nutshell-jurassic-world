import $ from 'jquery';
import './allStaff.scss';
import staffData from '../../helpers/data/staffData';
import utilities from '../../helpers/utilities';
import staffTitle from './assets/images/staffTitle.gif';
import assignVendors from '../assignVendors/assignVendors';
import assignRides from '../assignRideStaff/assignRideStaff';

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
  staffData.getStaff()
    .then((allStaff) => {
      if (allStaff[0]) {
        let domString = `
        <div class="row justify-content-center" id="dinoTitle"><img src=${staffTitle}></div>
        <div class="d-flex justify-content-center">
        <button href="#" class="btn btn-outline-dark hireButton cudButton" hireId="hire"  data-toggle="modal" data-target="#staffModal">Hire</button></div>
        <div id="staffSection" class="container d-flex flex-wrap justify-content-center">
        `;
        allStaff.forEach((staff) => {
          domString += `
        <div class="card staffCard col-3 shadow p-3 mb-5 bg-white rounded" id="${staff.id}">
          <img src="${staff.imgUrl}" class="card-img-top staffImg img-responsive" alt="picture of ${staff.name}">
            <div class="card-body">
              <h5 class="card-title">${staff.name}</h5>
              <p class="card-text">${staff.role}</p>
              </div>
              <div class="card-footer d-flex justify-content-between flex-wrap">
                <button href="#" class="btn btn-dark fire cudButton" id="fire-${staff.id}">Fire</button>
                <button href="#" class="btn btn-dark updateRole cudButton" id="update-${staff.id}" data-toggle="modal" data-target="#updateStaffModal">Update Role</button>
              </div>
        </div>
        `;
        });
        domString += '</div></div>';
        utilities.printToDom('printComponent', domString);
      }
      $('.fire').click(fireStaff);
      $('#hireStaff').click(hireStaff);
      $('.updateStaff').click(updateStaff);
      $('.updateRole').click(getStaffUpdate);
    })
    .catch((error) => console.error(error));
};

const getAliveStaff = (event) => {
  staffData.getLivingStaffMembers()
    .then((staffMembers) => {
      let domstring = '';
      domstring += `
        <div>
          <label for="exampleFormControlSelect1">Select Staff Member</label>
          <select class="form-control" id="exampleFormControlSelect1">`;
      staffMembers.forEach((member) => {
        domstring += `<option value="${member.id}">${member.name}</option>`;
      });
      domstring += `
        </select>
      </div>
    `;
      utilities.printToDom('assignStaffMod', domstring);
      const storeIdsNeeded = $(event.target).attr('id');
      $('.add-staff-assignment').attr('store-ids', storeIdsNeeded);
      const assigningFactor = $(event.target).attr('class');
      if (assigningFactor.includes('assignRide')) {
        $('.add-staff-assignment').attr('id', 'assigningRideButton');
      } else if (assigningFactor.includes('assignDino')) {
        $('.add-staff-assignment').attr('id', 'assigningDinoButton');
      } else if (assigningFactor.includes('assignVendor')) {
        $('.add-staff-assignment').attr('id', 'assigningVendorButton');
      }
      $('#assigningRideButton').click(assignRides.assignRideStaff);
      $('#assigningDinoButton').click();
      $('#assigningVendorButton').click(assignVendors.assignStaffVendor);
    })
    .catch((error) => console.error(error));
};

$('body').on('click', '.assignStaff', (event) => {
  $('#assignStaffModal').modal('show');
  getAliveStaff(event);
});

export default { buildAllStaff, getAliveStaff };
