import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllVendors = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/vendors.json`)
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

const shutDownVendor = (vendorId) => axios.delete(`${baseUrl}/vendors/${vendorId}.json`);

const addNewVendor = (newVendor) => axios.post(`${baseUrl}/vendors/.json`, newVendor);

export default { getAllVendors, shutDownVendor, addNewVendor };
