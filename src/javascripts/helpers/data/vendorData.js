import Axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllVendors = () => new Promise((resolve, reject) => {
  Axios.get(`${baseUrl}/vendors.json`)
    .then((response) => {
      const demVendors = response.data;
      const vendors = [];
      Object.keys(demVendors).forEach((fbId) => {
        demVendors[fbId].id = fbId;
        vendors.push(demVendors[fbId]);
      });
      resolve(vendors);
    })
    .catch((error) => reject(error));
});

export default { getAllVendors };
