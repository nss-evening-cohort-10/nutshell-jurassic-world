import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getRides = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rides.json`)
    .then((response) => {
      const demRides = response.data;
      const rides = [];
      Object.keys(demRides).forEach((fbId) => {
        demRides[fbId].id = fbId;
        rides.push(demRides[fbId]);
      });
      resolve(rides);
    })
    .catch((error) => reject(error));
});

export default { getRides };
