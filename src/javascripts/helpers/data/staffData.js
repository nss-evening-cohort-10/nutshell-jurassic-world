import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utilities from '../utilities';
import staffTitle from '../../components/allStaff/assets/images/staffTitle.gif';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getStaff = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json`)
    .then((response) => {
      const demStaff = response.data;
      const allStaff = [];
      if (demStaff === null) {
        const noStaffString = `
        <div class="row justify-content-center" id="dinoTitle"><img src=${staffTitle}></div>
        <div class="d-flex justify-content-center">
        <button href="#" class="btn btn-outline-dark hireButton" hireId="hire"  data-toggle="modal" data-target="#staffModal">Hire</button></div>
        <div id="staffSection" class="container d-flex flex-wrap justify-content-center">
        <h1>Probably helps if you hire some folks to run this joint, don't you think?</h1>
        `;
        utilities.printToDom('staff', noStaffString);
      } else {
        Object.keys(demStaff).forEach((fbId) => {
          demStaff[fbId].id = fbId;
          allStaff.push(demStaff[fbId]);
        });
      }
      resolve(allStaff);
    })
    .catch((error) => reject(error));
});

const fireStaff = (staffId) => axios.delete(`${baseUrl}/staff/${staffId}.json`);

const hireStaff = (newStaff) => axios.post(`${baseUrl}/staff.json`, newStaff);

const updateRole = (staffId, updatedStaff) => axios.put(`${baseUrl}/staff/${staffId}.json`, updatedStaff);

const updateStaff = (staffId, newStaff) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff/${staffId}.json`)
    .then((result) => {
      const staffObject = { ...result.data };
      staffObject.name = newStaff.name;
      staffObject.age = newStaff.age;
      staffObject.statusId = newStaff.statusId;
      staffObject.role = newStaff.role;
      staffObject.img = newStaff.img;
      updateRole(staffId, staffObject)
        .then(() => {
          resolve();
        });
    })
    .catch((error) => reject(error));
});

export default {
  getStaff,
  fireStaff,
  hireStaff,
  updateStaff,
  updateRole,
};
