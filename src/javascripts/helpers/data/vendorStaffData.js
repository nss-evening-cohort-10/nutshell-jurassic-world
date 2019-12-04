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

const getVendorStaffbyStaffId = (staffId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/vendorStaff.json`)
    .then((response) => {
      const vendorStaffArr = response.data;
      const vendorStaff = [];
      Object.keys(vendorStaffArr).forEach((fbId) => {
        vendorStaffArr[fbId].id = fbId;
        vendorStaff.push(vendorStaffArr[fbId]);
      });
      const filteredResults = vendorStaff.filter((x) => x.staffId === staffId);
      resolve(filteredResults);
    })
    .catch((error) => reject(error));
});

const createNewVendorStaff = (newVendorStaff) => axios.post(`${baseUrl}/vendorStaff.json`, newVendorStaff);

const removeVendorStaff = (vendorStaffId) => axios.delete(`${baseUrl}/vendorStaff/${vendorStaffId}.json`);

export default {
  getVendorStaff,
  createNewVendorStaff,
  getVendorStaffbyStaffId,
  removeVendorStaff,
};
