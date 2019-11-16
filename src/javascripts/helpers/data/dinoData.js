import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getDinosaurs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/dinos.json`)
    .then((response) => {
      const demDinos = response.data;
      const dinos = [];
      Object.keys(demDinos).forEach((fbId) => {
        demDinos[fbId].id = fbId;
        dinos.push(demDinos[fbId]);
      });
      resolve(dinos);
    })
    .catch((error) => reject(error));
});

export default { getDinosaurs };
