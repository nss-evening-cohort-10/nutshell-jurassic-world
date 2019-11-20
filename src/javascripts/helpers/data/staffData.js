import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getStaff = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json`)
    .then((response) => {
      const demStaff = response.data;
      const allStaff = [];
      Object.keys(demStaff).forEach((fbId) => {
        demStaff[fbId].id = fbId;
        allStaff.push(demStaff[fbId]);
      });
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
