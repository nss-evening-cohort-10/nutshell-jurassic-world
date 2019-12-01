import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getShifts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/shifts.json`)
    .then((response) => {
      const shiftArr = response.data;
      const shifts = [];
      Object.keys(shiftArr).forEach((fbId) => {
        shiftArr[fbId].id = fbId;
        shifts.push(shiftArr[fbId]);
      });
      resolve(shifts);
    })
    .catch((error) => reject(error));
});

export default { getShifts };
