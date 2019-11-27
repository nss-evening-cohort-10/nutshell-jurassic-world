import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utilities from '../utilities';
import dinoTop from '../../components/dinos/assets/images/DinoTitle.gif';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getDinosaurs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/dinosaurs.json`)
    .then((response) => {
      const demDinos = response.data;
      const dinos = [];
      if (demDinos === null) {
        const domString = `
        <div class="row justify-content-center" id="dinoTitle"><img src=${dinoTop}></div>
        <div class="container text-center" id="buttonDiv">
        <button class="btn btn-outline-dark cudButton" id="spawn" data-toggle="modal" data-target="#dinoModal">Spawn Dino</button>
        <h1>You got no dino DNA! Get to spawning!</h1>
        </div>
        <div class="d-flex row wrap justify-content-center">
        `;
        utilities.printToDom('printComponent', domString);
      } else {
        Object.keys(demDinos).forEach((fbId) => {
          demDinos[fbId].id = fbId;
          dinos.push(demDinos[fbId]);
        });
      }
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
      updateDino(dinoId, dinoObject)
        .then(() => {
          resolve();
        });
    })
    .catch((error) => reject(error));
});

export default {
  getDinosaurs,
  addNewDino,
  euthenizeDino,
  updateDinoInfo,
};
