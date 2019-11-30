import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getDinoStaff = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/dinos.json`)
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

export default { getDinoStaff };
