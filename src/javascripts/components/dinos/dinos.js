import $ from 'jquery';
import 'firebase/auth';
import dinoData from '../../helpers/data/dinoData';
import utilities from '../../helpers/utilities';
import './dinos.scss';
import dinoTitle from './assets/images/DinoTitle.gif';

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


const updateDino = (e) => {
  e.stopImmediatePropagation();
  const dinoId = e.target.id.split('dino-')[1];
  const newInfo = {
    name: $('#new-dino-name').val(),
    dinoImage: $('#new-dino-pic').val(),
    sizeWeight: $('#new-dino-size').val() * 1,
    dangerLevel: $('#new-danger-selector').val() * 1,
  };
  dinoData.updateDinoInfo(dinoId, newInfo)
    .then(() => {
      $('#dinoEditModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printDinos();
    })
    .catch((error) => console.error(error));
};

const deleteDino = (e) => {
  e.stopImmediatePropagation();
  const dinoToDelete = e.target.id.split('kill-')[1];
  dinoData.euthenizeDino(dinoToDelete)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printDinos();
    })
    .catch((error) => console.error(error));
};


const getDinoToUpdate = (e) => {
  e.stopImmediatePropagation();
  $('#dinoEditModal').modal('show');
  const dinoToUpdate = e.target.id.split('update-')[1];
  dinoData.getDinosaurs()
    .then((dinos) => {
      dinos.forEach((dino) => {
        if (dino.id === dinoToUpdate) {
          const newId = `dino-${dino.id}`;
          $('#new-dino-name').val(`${dino.name}`);
          $('#new-dino-pic').val(`${dino.dinoImage}`);
          $('#new-dino-size').val(`${dino.sizeWeight}`);
          $('#new-danger-selector').val(`${dino.dangerLevel}`);
          $('.updateDinoInfo').attr('id', newId);
        }
      });
    })
    .catch((error) => console.error(error));
};

const printDinos = () => {
  let domString = `
  <div class="row justify-content-center" id="dinoTitle"><img src=${dinoTitle}></div>
  <div class="container text-center" id="buttonDiv">
  <button class="btn btn-outline-dark cudButton" id="spawn" data-toggle="modal" data-target="#dinoModal">Spawn Dino</button>
  </div>
  <div class="d-flex row wrap justify-content-center">`;
  dinoData.getDinosaurs()
    .then((dinos) => {
      if (dinos[0]) {
        dinos.forEach((dino) => {
          domString += `
        <div class="card col-sm-3 m-3 dinoCards">
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
          <button class="btn btn-dark updateDino cudButton" id="update-${dino.id}">Update</button>
          <button class="btn btn-dark kill cudButton" id="kill-${dino.id}">Euthenize</button>
          </div>
        </div>`;
        });
        domString += '</div>';
        utilities.printToDom('printComponent', domString);
        $('body').on('click', '#addDino', addNewDino);
        $('body').on('click', '.updateDino', getDinoToUpdate);
        $('body').on('click', '.updateDinoInfo', updateDino);
        $('body').on('click', '.kill', deleteDino);
      }
    })
    .catch((error) => console.error(error));
};

export default { printDinos };
