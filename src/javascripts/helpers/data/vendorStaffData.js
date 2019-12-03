import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getVendorStaff = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/vendorStaff.json`)
    .then((response) => {
      const vendorStaffArr = response.data;
      const vendorStaff = [];
      Object.keys(vendorStaffArr).forEach((fbId) => {
        vendorStaffArr[fbId].id = fbId;
        vendorStaff.push(vendorStaffArr[fbId]);
      });
      resolve(vendorStaff);
    })
    .catch((error) => reject(error));
});

const createNewVendorStaff = (newVendorStaff) => axios.post(`${baseUrl}/vendorStaff.json`, newVendorStaff);


export default { getVendorStaff, createNewVendorStaff };
