import $ from 'jquery';
import './dinoHandlerCount.scss';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';

const dinoAlert = () => {
  smash.getDinosWithAssignment()
    .then((allDinosWithAssignment) => {
      let domString = '<ul class="list-group list-group-flush">';
      allDinosWithAssignment.forEach((dino) => {
        if (dino.assignments.length < 2) {
          domString += `<li class="list-group-item each-dino">${dino.name}</li>`;
        }
      });
      domString += '</ul>';
      utilities.printToDom('dinosWithLessThanTwoHandlers', domString);
      $('#handlerCountToast').css('z-index', 3001);
      $('#handlerCountToast').toast('show');
    })
    .catch((error) => console.error(error));
};

const cron = require('cron');

const dinoAlertTimed = cron.job('*/30 * * * *', () => {
  dinoAlert();
});

export default { dinoAlertTimed };
