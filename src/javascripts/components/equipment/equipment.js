import $ from 'jquery';
import equipmentData from '../../helpers/data/equipmentData';
import smash from '../../helpers/data/smash';
import './equipment.scss';
import utilities from '../../helpers/utilities';
import equipmentTitle from './assets/images/equipmentTitle.gif';
import equipStaffData from '../../helpers/data/equipStaffData';

const displayBrokenEquipment = () => {
  equipmentData.findBrokenEquipment().then((equipment) => {
    if (equipment[0]) {
      let domString = `<div class="row justify-content-center" id="brokenHeader"><img src=></div>
      <div id="brokenEquipTableContainer" class="mx-5">
      <table id="brokenEquipTable" class="table table-hover mt-5">
        <thead>
          <tr>
            <th scope="col-6">Broken Item</th>
            <th scope="col-6">Stock Number</th>
          </tr>
        </thead>
        <tbody>
      `;
      equipment.forEach((equip) => {
        domString += `
        <tr>
          <td>${equip.type}</td>
          <td>${equip.id}</td>
        </tr>`;
      });
      domString += '</tbody></table></div>';
      utilities.printToDom('brokenEquipToast', domString);
      $('#brokenToast').css('z-index', 3001);
      $('#brokenToast').toast('show');
    }
  }).catch((err) => console.error(err));
};

const selectEquipAssignmentView = (e) => {
  const assignmentSelection = $(e.target).val();
  if (assignmentSelection === 'assignedEquip') {
    $('.assignedEquipment').removeClass('hide');
    $('.unassignedEquipment').addClass('hide');
  } else if (assignmentSelection === 'unassignedEquip') {
    $('.assignedEquipment').addClass('hide');
    $('.unassignedEquipment').removeClass('hide');
  } else {
    $('.assignedEquipment').removeClass('hide');
    $('.unassignedEquipment').removeClass('hide');
  }
};

const getAssignedEquipment = () => new Promise((resolve, reject) => {
  smash.getEquipmentWithAssignment().then((allEquipmentDetails) => {
    const assignedEquipment = [];
    allEquipmentDetails.forEach((equipItem) => {
      if (equipItem.assignment !== '') {
        assignedEquipment.push(equipItem);
      }
    });
    resolve(assignedEquipment);
  }).catch((err) => reject(err));
});

const getUnassignedEquipment = () => new Promise((resolve, reject) => {
  smash.getEquipmentWithAssignment().then((allEquipmentDetails) => {
    const allEquipmentNames = [];
    allEquipmentDetails.forEach((item) => {
      allEquipmentNames.push(item.type);
    });
    const distinctEquip = new Set(allEquipmentNames);
    const unassignedEquip = allEquipmentDetails.filter((x) => x.assignment === '');
    const consolidatedUnassignedEquipment = [];
    distinctEquip.forEach((equipType) => {
      const reducedUnassignedEquipment = unassignedEquip.filter((y) => y.type === equipType);
      if (reducedUnassignedEquipment[0]) {
        const skipBroken = reducedUnassignedEquipment.find((z) => z.isBroken === false);
        const reducedCount = reducedUnassignedEquipment.length;
        if (skipBroken) {
          skipBroken.qty = reducedCount;
          consolidatedUnassignedEquipment.push(skipBroken);
        } else {
          reducedUnassignedEquipment[0].qty = reducedCount;
          consolidatedUnassignedEquipment.push(reducedUnassignedEquipment[0]);
        }
      }
    });
    resolve(consolidatedUnassignedEquipment);
  }).catch((err) => reject(err));
});

const createEquipment = (e) => {
  e.stopImmediatePropagation();
  const newEquipment = {
    type: $('#new-equipment-name').val(),
    description: $('#new-equipment-desc').val(),
    isBroken: false,
  };
  equipmentData.addEquipment(newEquipment)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printEquipment();
      $('#equipmentModal').modal('hide');
      $('#newEquipment').trigger('reset');
    })
    .catch((error) => console.error(error));
};

const trashEquipment = (e) => {
  e.stopImmediatePropagation();
  const equipmentId = e.target.id.split('trash-')[1];
  const equipStaffId = $(e.target).attr('name');
  equipmentData.removeEquipment(equipmentId)
    .then(() => {
      if (equipStaffId) {
        equipStaffData.removeEquipStaff(equipStaffId)
          .then(() => {
            // eslint-disable-next-line no-use-before-define
            printEquipment();
          });
      } else {
        // eslint-disable-next-line no-use-before-define
        printEquipment();
      }
    })
    .catch((error) => console.error(error));
};

const updateEquipment = (e) => {
  e.stopImmediatePropagation();
  const equipmentType = $(e.target).attr('name');
  const updatedEquipment = {
    type: $('#update-equipment-name').val(),
    description: $('#update-equipment-desc').val(),
  };
  equipmentData.updateEquipmentInfo(equipmentType, updatedEquipment)
    .then(() => {
      $('#updateEquipmentModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printEquipment();
    })
    .catch((error) => console.error(error));
};

const getEquipmentToUpdate = (e) => {
  e.stopImmediatePropagation();
  $('#updateEquipmentModal').modal('show');
  const equipmentToUpdate = e.target.id.split('update-')[1];
  equipmentData.getEquipmentData()
    .then((equipments) => {
      equipments.forEach((equipment) => {
        if (equipment.id === equipmentToUpdate) {
          $('#update-equipment-name').val(`${equipment.type}`);
          $('#update-equipment-desc').val(`${equipment.description}`);
          $('.save-updated-equipment').attr('name', equipment.type);
        }
      });
    })
    .catch((error) => console.error(error));
};

const printEquipment = () => {
  let domString = `
  <div class="row justify-content-center" id="dinoTitle"><img src=${equipmentTitle}></div>
  <div class="row d-flex justify-content-center">
  <button class="btn btn-outline-dark cudButton mt-5 mr-4 mb-2" id="newEquip" data-toggle="modal" data-target="#equipmentModal">Get New Equipment</button>
  <button class="btn btn-outline-dark mt-5 mr-4 mb-2" id="testEquip">Test Equipment</button>
  <form class='row d-flex m-4'>
    <div class="form-group">
      <label for="chooseEquipAssignment">Filter by Assignment</label>
      <select class="form-control" id="chooseEquipAssignment">
        <option value='allEquip'>All</option>
        <option value='assignedEquip'>Assigned</option>
        <option value='unassignedEquip'>Unassigned</option>
      </select>
    </div>
  </form>
  </div>
  <div class="d-flex row wrap justify-content-center">`;
  getUnassignedEquipment()
    .then((equipment) => {
      if (equipment[0]) {
        equipment.forEach((equip) => {
          domString += `
          <div class="card col-sm-3 m-3 unassignedEquipment equipCards">
            <div class="card-body">
            <h5 class="card-title text-center">${equip.type}</h5>
            <p class="card-text">${equip.description}</p>
            <h6>Quantity: ${equip.qty}</h6>
            <h6 class='unassignedEquip'>Unassigned</h6>
            </div>
            <div class="card-footer row">
            <button class="btn btn-dark updateEquip cudButton" id="update-${equip.id}" name="${equip.type}">Update</button>
            <button class="btn btn-dark assignEquipment assignStaff cudButton broken-${equip.isBroken}" id="assign-${equip.id}">Assign to Staff</button>
            <button class="btn btn-dark removeEquip cudButton" id="trash-${equip.id}">Trash</button>
            </div>
          </div>`;
        });
      }
      getAssignedEquipment().then((assignEquipments) => {
        if (assignEquipments[0]) {
          assignEquipments.forEach((assignedEquip) => {
            domString += `
            <div class="card col-sm-3 m-3 assignedEquipment equipCards">
              <div class="card-body">
              <h5 class="card-title text-center">${assignedEquip.type}</h5>
              <p class="card-text">${assignedEquip.description}</p>
              <h6 class='assignedEquip'>Assigned to: ${assignedEquip.assignment.staffName}</h6>
              </div>
              <div class="card-footer row">
              <button class="btn btn-dark updateEquip cudButton" id="update-${assignedEquip.id}" name="${assignedEquip.type}">Update</button>
              <button class="btn btn-dark removeEquip cudButton" id="trash-${assignedEquip.id}" name="${assignedEquip.assignment.id}">Trash</button>
              </div>
            </div>`;
          });
        }
        domString += '</div>';
        utilities.printToDom('printComponent', domString);
        $('.broken-true').attr('disabled', true);
        $('#chooseEquipAssignment').change(selectEquipAssignmentView);
        $('#testEquip').click(displayBrokenEquipment);
        $('body').on('click', '.save-new-equipment', createEquipment);
        $('body').on('click', '.removeEquip', trashEquipment);
        $('body').on('click', '.updateEquip', getEquipmentToUpdate);
        $('body').on('click', '.save-updated-equipment', updateEquipment);
      });
    })
    .catch((error) => console.error(error));
};

export default { printEquipment };
