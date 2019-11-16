import axios from 'axios';
import apiKeys from '../apiKeys.json';

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

const deleteRide = (ride) => axios.delete(`${baseUrl}/rides/${ride}.json`);

const addRide = (newRide) => axios.post(`${baseUrl}/rides.json`, newRide);

const updateRide = (rideId, updatedRide) => axios.put(`${baseUrl}/rides/${rideId}.json`, updatedRide);

const updateRideInfo = (rideId, newInfo) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rides/${rideId}.json`)
    .then((result) => {
      const rideObject = { ...result.data };
      rideObject.name = newInfo.name;
      rideObject.imgUrl = newInfo.imgUrl;
      rideObject.status = newInfo.status;
      rideObject.isExhibit = newInfo.isExhibit;
      updateRide(rideId, rideObject)
        .then(() => {
          resolve();
        });
    })
    .catch((error) => reject(error));
});

export default {
  getRides,
  deleteRide,
  addRide,
  updateRide,
  updateRideInfo,
};
