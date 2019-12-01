import axios from 'axios';
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

const updateEquipmentInfo = (equipmentId, updatedEquipmentInfo) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/equipment/${equipmentId}.json`)
    .then((result) => {
      const equipmentObject = { ...result.data };
      equipmentObject.type = updatedEquipmentInfo.type;
      equipmentObject.description = updatedEquipmentInfo.description;
      updateEquipment(equipmentId, equipmentObject)
        .then(() => {
          resolve();
        });
    })
    .catch((error) => reject(error));
});
export default {
  getEquipmentData,
  addEquipment,
  removeEquipment,
  updateEquipmentInfo,
  updateEquipment,
};
