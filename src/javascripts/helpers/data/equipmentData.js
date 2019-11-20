import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getEquipmentData = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/equipment.json`)
    .then((response) => {
      const demEquips = response.data;
      const equips = [];
      Object.keys(demEquips).forEach((fbId) => {
        demEquips[fbId].id = fbId;
        equips.push(demEquips[fbId]);
      });
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
      equipmentObject.statusId = updatedEquipmentInfo.statusId;
      equipmentObject.description = updatedEquipmentInfo.description;
      equipmentObject.quantity = updatedEquipmentInfo.quantity;
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
