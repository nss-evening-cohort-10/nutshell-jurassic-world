import $ from 'jquery';
import equipmentData from '../../helpers/data/equipmentData';
import './equipment.scss';
import utilities from '../../helpers/utilities';
import equipmentTitle from './assets/images/equipmentTitle.gif';


const createEquipment = (e) => {
  e.stopImmediatePropagation();
  const newEquipment = {
    type: $('#new-equipment-name').val(),
    description: $('#new-equipment-desc').val(),
    quantity: $('#new-equipment-quantity').val(),
    status: 'status1',
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
  equipmentData.removeEquipment(equipmentId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printEquipment();
    })
    .catch((error) => console.error(error));
};

const updateEquipment = (e) => {
  e.stopImmediatePropagation();
  const equipmentId = e.target.id.split('equipment-')[1];
  const updatedEquipment = {
    type: $('#update-equipment-name').val(),
    description: $('#update-equipment-desc').val(),
    quantity: $('#update-equipment-quantity').val(),
    status: 'status1',
  };
  equipmentData.updateEquipmentInfo(equipmentId, updatedEquipment)
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
          const newId = `equipment-${equipment.id}`;
          $('#update-equipment-name').val(`${equipment.type}`);
          $('#update-equipment-quantity').val(`${equipment.quantity}`);
          $('#update-equipment-desc').val(`${equipment.description}`);
          $('.save-updated-equipment').attr('id', newId);
        }
      });
    })
    .catch((error) => console.error(error));
};

const printEquipment = () => {
  let domString = `
  <div class="row justify-content-center" id="dinoTitle"><img src=${equipmentTitle}></div>
  <div class="container text-center">
  <button class="btn btn-outline-dark cudButton" id="newEquip" data-toggle="modal" data-target="#equipmentModal">Get New Equipment</button></div>
  <div class="d-flex row wrap justify-content-center">`;
  equipmentData.getEquipmentData()
    .then((equipment) => {
      if (equipment[0]) {
        equipment.forEach((equip) => {
          domString += `
          <div class="card col-sm-3 m-3 equipCards">
            <div class="card-body">
            <h5 class="card-title text-center">${equip.type}</h5>
            <p class="card-text">${equip.description}</p>
            <h6>Status: ${equip.status}</h6>
            <h6>Quantity: ${equip.quantity}</h6>
          </div>
          <div class="card-footer row">
          <button class="btn btn-dark updateEquip cudButton" id="update-${equip.id}">Update</button>
          <button class="btn btn-dark removeEquip cudButton" id="trash-${equip.id}">Trash</button>
          </div>`;
          domString += '</div>';
          utilities.printToDom('printComponent', domString);
        });
      }
      $('body').on('click', '.save-new-equipment', createEquipment);
      $('body').on('click', '.removeEquip', trashEquipment);
      $('body').on('click', '.updateEquip', getEquipmentToUpdate);
      $('body').on('click', '.save-updated-equipment', updateEquipment);
    })
    .catch((error) => console.error(error));
};

export default { printEquipment };
