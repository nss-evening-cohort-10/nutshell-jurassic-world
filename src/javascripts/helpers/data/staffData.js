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

export default { getStaff, fireStaff };
