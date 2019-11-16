import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import equipmentData from '../../helpers/data/equipmentData';
import './equipment.scss';
import utilities from '../../helpers/utilities';

const userModeToggle = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    $('.updateEquip').removeClass('hide');
    $('.removeEquip').removeClass('hide');
    $('#newEquip').removeClass('hide');
  } else {
    $('.updateEquip').addClass('hide');
    $('.removeEquip').addClass('hide');
    $('#newEquip').addClass('hide');
  }
};

const printEquipment = () => {
  $('#home-page').addClass('hide');
  $('#equipment').removeClass('hide');
  $('#staff').addClass('hide');
  $('#rides').addClass('hide');
  $('#dinosaurs').addClass('hide');
  let domString = `
  <div class="container text-center">
  <button class="btn btn-dark" id="newEquip" data-toggle="modal" data-target="#equipmentModal">Get New Equipment</button></div>
  <div class="d-flex row wrap justify-content-center">`;
  equipmentData.getEquipmentData()
    .then((equipment) => {
      equipment.forEach((equip) => {
        domString += `
        <div class="card col-3 m-2 equipCards">
          <div class="card-body">
          <h5 class="card-title text-center">${equip.type}</h5>
          <p class="card-text">${equip.description}</p>
          <h6>Status: ${equip.status}</h6>
          <h6>Quantity: ${equip.quantity}</h6>
        </div>
        <div class="card-footer row">
        <button class="btn btn-dark updateEquip" id="update-${equip.id}">Update</button>
        <button class="btn btn-dark removeEquip" id="trash-${equip.id}">Trash</button>
        </div>`;
        domString += '</div>';
        utilities.printToDom('equipment', domString);
        userModeToggle();
      });
    })
    .catch((error) => console.error(error));
};

export default { printEquipment };
