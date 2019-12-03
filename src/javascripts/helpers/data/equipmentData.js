import axios from 'axios';
import $ from 'jquery';
import apiKeys from '../apiKeys.json';
import utilities from '../utilities';
import equipmentTitle from '../../components/equipment/assets/images/equipmentTitle.gif';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getEquipmentData = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/equipment.json`)
    .then((response) => {
      const demEquips = response.data;
      const equips = [];
      if (demEquips === null) {
        const equipString = `
        <div class="row justify-content-center" id="dinoTitle"><img src=${equipmentTitle}></div>
        <div class="container text-center">
        <button class="btn btn-outline-dark cudButton" id="newEquip" data-toggle="modal" data-target="#equipmentModal">Get New Equipment</button></div>
        <h1 class="p-2">It looks like you don't have any equipment. Consider getting some before you are eaten!</h1>
        `;
        utilities.printToDom('printComponent', equipString);
      } else {
        Object.keys(demEquips).forEach((fbId) => {
          demEquips[fbId].id = fbId;
          equips.push(demEquips[fbId]);
        });
      }
      resolve(equips);
    })
    .catch((error) => reject(error));
});

const addEquipment = (newEquipment) => axios.post(`${baseUrl}/equipment.json`, newEquipment);

const removeEquipment = (equipmentId) => axios.delete(`${baseUrl}/equipment/${equipmentId}.json`);

const updateEquipment = (equipmentId, updatedEquipment) => axios.put(`${baseUrl}/equipment/${equipmentId}.json`, updatedEquipment);

const updateEquipmentInfo = (equipmentType, updatedEquipmentInfo) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/equipment.json?orderBy="type"&equalTo="${equipmentType}"`)
    .then((result) => {
      const equipmentArr = result.data;
      Object.keys(equipmentArr).forEach((fbId) => {
        const equipmentObject = {};
        equipmentObject.type = updatedEquipmentInfo.type;
        equipmentObject.description = updatedEquipmentInfo.description;
        equipmentObject.isBroken = equipmentArr[fbId].isBroken;
        updateEquipment(fbId, equipmentObject)
          .then(() => resolve());
      });
    })
    .catch((error) => reject(error));
});

const findBrokenEquipment = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/equipment.json?orderBy="isBroken"&equalTo=true`)
    .then((response) => {
      const brokenEquips = response.data;
      const theDamage = [];
      if (Object.keys(brokenEquips)[0] === undefined) {
        const equipString = `
        <div class="row justify-content-center" id="brokenHeader"><img src=></div>
        <div class="container text-center">
        <h2 class="p-2">Everything is in tip top shape!</h2>
        </div>
        `;
        utilities.printToDom('brokenEquipToast', equipString);
        $('#brokenToast').css('z-index', 3000);
        $('#brokenToast').toast('show');
      } else {
        Object.keys(brokenEquips).forEach((fbId) => {
          brokenEquips[fbId].id = fbId;
          theDamage.push(brokenEquips[fbId]);
        });
      }
      resolve(theDamage);
    }).catch((err) => reject(err));
});

export default {
  getEquipmentData,
  addEquipment,
  removeEquipment,
  updateEquipmentInfo,
  updateEquipment,
  findBrokenEquipment,
};
