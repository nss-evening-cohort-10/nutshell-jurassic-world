import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getDinosaurs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/dinosaurs.json`)
    .then((response) => {
      const demDinos = response.data;
      const dinos = [];
      Object.keys(demDinos).forEach((fbId) => {
        demDinos[fbId].id = fbId;
        dinos.push(demDinos[fbId]);
      });
      resolve(dinos);
    })
    .catch((error) => reject(error));
});

const euthenizeDino = (dinoId) => axios.delete(`${baseUrl}/dinosaurs/${dinoId}.json`);

const addNewDino = (newDino) => axios.post(`${baseUrl}/dinosaurs.json`, newDino);

const updateDino = (dinoId, updatedDino) => axios.put(`${baseUrl}/dinosaurs/${dinoId}.json`, updatedDino);

const updateDinoInfo = (dinoId, newInfo) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/dinosaurs/${dinoId}.json`)
    .then((result) => {
      const dinoObject = { ...result.data };
      dinoObject.name = newInfo.name;
      dinoObject.dinoImage = newInfo.dinoImage;
      dinoObject.sizeWeight = newInfo.sizeWeight;
      dinoObject.dangerLevel = newInfo.dangerLevel;
      updateDino(dinoId, dinoObject);
      resolve();
    })
    .catch((error) => reject(error));
});

export default {
  getDinosaurs,
  addNewDino,
  euthenizeDino,
  updateDinoInfo,
};
