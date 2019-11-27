import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utilities from '../utilities';
import vendorTop from '../../components/vendors/assets/images/vendorTitle.gif';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllVendors = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/vendors.json`)
    .then((response) => {
      const demVendors = response.data;
      const vendors = [];
      if (demVendors === null) {
        const domString = `
        <div class="row justify-content-center" id="dinoTitle"><img src=${vendorTop}></div>
        <div class="container text-center" id="buttonDiv">
        <button class="btn btn-outline-dark vendor-add" id="newVendor" data-toggle="modal" data-target="#newVendorModal">Create New Vendor</button>
        <h1>You got no vendors! How will you serve the people?</h1>
        </div>
        <div class="container">
        <div class="row justify-content-center">
        `;
        utilities.printToDom('vendors', domString);
      } else {
        Object.keys(demVendors).forEach((fbId) => {
          demVendors[fbId].id = fbId;
          vendors.push(demVendors[fbId]);
        });
      }
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
