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

const removeRideStaff = (rideStaffId) => axios.delete(`${baseUrl}/rideStaff/${rideStaffId}.json`);

const createNewRideStaff = (newRideStaff) => axios.post(`${baseUrl}/rideStaff.json`, newRideStaff);

const findRideStaffByRideId = (rideId) => new Promise((resolve, reject) => axios.get(`${baseUrl}/rideStaff.json?orderBy="rideId"&equalTo="${rideId}"`)
  .then((response) => resolve(Object.keys(response.data))).catch((error) => reject(error)));

export default {
  getRideStaff,
  createNewRideStaff,
  removeRideStaff,
  findRideStaffByRideId,
};
