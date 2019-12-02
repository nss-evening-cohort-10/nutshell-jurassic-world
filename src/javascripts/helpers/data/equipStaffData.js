import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getEquipStaff = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/equipStaff.json`)
    .then((response) => {
      const equipStaffArr = response.data;
      const equipStaff = [];
      Object.keys(equipStaffArr).forEach((fbId) => {
        equipStaffArr[fbId].id = fbId;
        equipStaff.push(equipStaffArr[fbId]);
      });
      resolve(equipStaff);
    })
    .catch((error) => reject(error));
});

const removeEquipStaff = (equipStaffId) => axios.delete(`${baseUrl}/equipStaff/${equipStaffId}.json`);


export default { getEquipStaff, removeEquipStaff };
