import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utilities from '../utilities';
import rideTitle from '../../components/rides/rides_assets/rideTitle.gif';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getRides = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rides.json`)
    .then((response) => {
      const demRides = response.data;
      const rides = [];
      if (demRides === null) {
        const domString = `<div id="dinoTitle" class="img-container"><img src="${rideTitle}" class="rides-title" alt="title"></div>
        <div class="center">
        <button id="build-ride" class="btn btn-outline-dark create-ride cudButton" data-toggle="modal" data-target="#rideModal">BUILD A RIDE</button>
        <h1 class="p-3">There aren't any rides. Click the button above to add one!</h1>
        </div>`;
        utilities.printToDom('printComponent', domString);
      } else {
        Object.keys(demRides).forEach((fbId) => {
          demRides[fbId].id = fbId;
          rides.push(demRides[fbId]);
        });
      }
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

const getNotBrokenRides = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json?orderBy="isOperational"&equalTo=true`)
    .then((response) => {
      const demRides = response.data;
      const workingRides = [];
      Object.keys(demRides).forEach((fbId) => {
        demRides[fbId].id = fbId;
        workingRides.push(demRides[fbId]);
      });
      resolve(workingRides);
    })
    .catch((error) => reject(error));
});

export default {
  getRides,
  deleteRide,
  addRide,
  updateRide,
  updateRideInfo,
  getNotBrokenRides,
};
