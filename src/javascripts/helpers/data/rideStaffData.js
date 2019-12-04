import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getRideStaff = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rideStaff.json`)
    .then((response) => {
      const rideStaffArr = response.data;
      const rideStaff = [];
      Object.keys(rideStaffArr).forEach((fbId) => {
        rideStaffArr[fbId].id = fbId;
        rideStaff.push(rideStaffArr[fbId]);
      });
      resolve(rideStaff);
    })
    .catch((error) => reject(error));
});

const getRideStaffByStaffId = (staffId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rideStaff.json`)
    .then((response) => {
      const rideStaffArr = response.data;
      const rideStaff = [];
      Object.keys(rideStaffArr).forEach((fbId) => {
        rideStaffArr[fbId].id = fbId;
        rideStaff.push(rideStaffArr[fbId]);
      });
      const filteredResult = rideStaff.filter((x) => x.staffId === staffId);
      resolve(filteredResult);
    })
    .catch((error) => reject(error));
});

const createNewRideStaff = (newRideStaff) => axios.post(`${baseUrl}/rideStaff.json`, newRideStaff);

const removeRideStaff = (rideStaffId) => axios.delete(`${baseUrl}/rideStaff/${rideStaffId}.json`);

export default {
  getRideStaff,
  createNewRideStaff,
  getRideStaffByStaffId,
  removeRideStaff,
};
