import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getStaff = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json`)
    .then((response) => {
      const demStaff = response.data;
      const allStaff = [];
      Object.keys(demStaff).forEach((fbId) => {
        demStaff[fbId].id = fbId;
        allStaff.push(demStaff[fbId]);
      });
      resolve(allStaff);
    })
    .catch((error) => reject(error));
});

const fireStaff = (staffId) => axios.delete(`${baseUrl}/staff/${staffId}.json`);

const hireStaff = (newStaff) => axios.post(`${baseUrl}/staff.json`, newStaff);

const updateRole = (staffId, updatedStaff) => axios.put(`${baseUrl}/staff/${staffId}.json`, updatedStaff);

export default { getStaff, fireStaff, hireStaff };
