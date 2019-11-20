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

const updateVendor = (vendorId, updatedVendor) => axios.put(`${baseUrl}/vendors/${vendorId}.json`, updatedVendor);

const updateVendorInfo = (vendorId, updatedVendorInfo) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/vendor/${vendorId}.json`)
    .then((result) => {
      const vendorObject = { ...result.data };
      vendorObject.type = updatedVendorInfo.type;
      vendorObject.name = updatedVendorInfo.name;
      vendorObject.description = updatedVendorInfo.description;
      vendorObject.img = updatedVendorInfo.img;
      updateVendor(vendorId, vendorObject)
        .then(() => {
          resolve();
        });
    })
    .catch((error) => reject(error));
});

export default {
  getAllVendors,
  shutDownVendor,
  addNewVendor,
  updateVendorInfo,
};
