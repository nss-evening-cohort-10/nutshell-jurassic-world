import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getDinoStaff = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/dinoStaff.json`)
    .then((response) => {
      const dinoStaffArr = response.data;
      const dinoStaff = [];
      Object.keys(dinoStaffArr).forEach((fbId) => {
        dinoStaffArr[fbId].id = fbId;
        dinoStaff.push(dinoStaffArr[fbId]);
      });
      resolve(dinoStaff);
    })
    .catch((error) => reject(error));
});

const getDinoStaffbyStaffId = (staffId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/dinoStaff.json`)
    .then((response) => {
      const dinoStaffArr = response.data;
      const dinoStaff = [];
      Object.keys(dinoStaffArr).forEach((fbId) => {
        dinoStaffArr[fbId].id = fbId;
        dinoStaff.push(dinoStaffArr[fbId]);
      });
      const filteredResult = dinoStaff.filter((x) => x.staffId === staffId);
      resolve(filteredResult);
    })
    .catch((error) => reject(error));
});

const createNewDinoStaff = (newDinoStaff) => axios.post(`${baseUrl}/dinoStaff.json`, newDinoStaff);

const removeDinoStaff = (dinoStaffId) => axios.delete(`${baseUrl}/dinoStaff/${dinoStaffId}.json`);

export default {
  getDinoStaff,
  createNewDinoStaff,
  getDinoStaffbyStaffId,
  removeDinoStaff,
};
