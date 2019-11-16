import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import dinoData from '../../helpers/data/dinoData';
import utilities from '../../helpers/utilities';
import './dinos.scss';

const userModeToggle = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    $('.updateDino').removeClass('hide');
    $('.kill').removeClass('hide');
    $('#spawn').removeClass('hide');
  } else {
    $('.updateDino').addClass('hide');
    $('.kill').addClass('hide');
    $('#spawn').addClass('hide');
  }
};

const addNewDino = (e) => {
  e.stopImmediatePropagation();
  const newDino = {
    name: $('#dino-name').val(),
    dinoImage: $('#dino-pic').val(),
    species: $('#dino-species').val(),
    diet: $('#diet-selector').val(),
    sizeWeight: $('#dino-size').val() * 1,
    description: $('#dino-description').val(),
    dangerLevel: $('#danger-selector').val() * 1,
  };
  dinoData.addNewDino(newDino)
    .then(() => {
      $('#dinoModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printDinos();
    })
    .catch((error) => console.error(error));
  $('#dino-name').val('');
  $('#dino-pic').val('');
  $('#dino-species').val('');
  $('#diet-selector').val('Choose...');
  $('#dino-size').val('');
  $('#dino-description').val('');
  $('#danger-selector').val('Choose...');
};

const printDinos = () => {
  $('#home-page').addClass('hide');
  $('#dinosaurs').removeClass('hide');
  let domString = `
  <button class="btn btn-dark" id="spawn" data-toggle="modal" data-target="#dinoModal">Spawn Dino</button>
  <div class="d-flex row wrap justify-content-center">`;
  dinoData.getDinosaurs()
    .then((dinos) => {
      dinos.forEach((dino) => {
        domString += `
        <div class="card col-3 m-2 dinoCards">
          <img src="${dino.dinoImage}" class="card-img-top" alt="${dino.name}">
          <div class="card-body">
            <h5 class="card-title">${dino.name}</h5>
            <h6>Type: ${dino.species}</h6>
            <h6>Diet: ${dino.diet}</h6>
            <h6>Size: ${dino.sizeWeight}</h6>
            <p class="card-text">${dino.description}</p>
            <h6 id="dangerRate">Danger Rating: ${dino.dangerLevel}</h6>
          </div>
          <div class="card-footer row">
          <button class="btn btn-dark updateDino" id="update-${dino.id}">Update</button>
          <button class="btn btn-dark kill" id="kill-${dino.id}">Euthenize</button>
          </div>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('dinosaurs', domString);
      userModeToggle();
      $('body').on('click', '#addDino', addNewDino);
    })
    .catch((error) => console.error(error));
};

export default { printDinos, userModeToggle };
