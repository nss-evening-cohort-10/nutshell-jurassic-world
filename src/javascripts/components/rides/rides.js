import $ from 'jquery';
import '@fortawesome/fontawesome-free/js/all';
import 'firebase/auth';

import rideData from '../../helpers/data/rideData';
import individualRide from './individualRide/individualRide';
import utilities from '../../helpers/utilities';

import './rides.scss';
import rideTitle from './rides_assets/rideTitle.gif';

const deleteRide = (e) => {
  e.stopImmediatePropagation();
  const rideId = e.target.id.split('delete-')[1];
  rideData.deleteRide(rideId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printRides();
    })
    .catch((error) => console.error(error));
};

const createRide = (e) => {
  e.stopImmediatePropagation();
  const newRide = {
    name: $('#new-ride-name').val(),
    imgUrl: $('#new-ride-pic').val(),
    isExhibit: $('#new-exhibit-status').val(),
    status: 'status1',
  };
  rideData.addRide(newRide)
    .then(() => {
      $('#rideModal').modal('hide');
      document.forms['rides-form'].reset();
      // eslint-disable-next-line no-use-before-define
      printRides();
    })
    .catch((error) => console.error(error));
};

const updateRide = (e) => {
  const rideId = e.target.id.split('ride-')[1];
  $('#rideUpdateModal').modal('show');
  const newRideInfo = {
    name: $('#update-ride-name').val(),
    imgUrl: $('#update-ride-pic').val(),
    isExhibit: $('#update-exhibit-status').val(),
    status: 'status1',
  };
  rideData.updateRideInfo(rideId, newRideInfo)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printRides();
      $('#rideUpdateModal').modal('hide');
    })
    .catch((error) => console.error(error));
};

const getRideInfo = (e) => {
  const rideId = e.target.id.split('edit-')[1];
  $('#rideUpdateModal').modal('show');
  rideData.getRides()
    .then((rides) => {
      rides.forEach((ride) => {
        if (rideId === ride.id) {
          $('#update-ride-name').val(`${ride.name}`);
          $('#update-ride-pic').val(`${ride.imgUrl}`);
          $('#update-exhibit-status').val(`${ride.isExhibit}`);
          const newRideId = `ride-${ride.id}`;
          $('.ride-update-save-changes').attr('id', newRideId);
        }
      });
    })
    .catch((error) => console.error(error));
};

const printRides = () => {
  rideData.getRides()
    .then((rides) => {
      if (rides[0]) {
        let domString = `<div id="dinoTitle" class="img-container"><img src="${rideTitle}" class="rides-title" alt="title" /></div>`;
        domString += '<div class="center"><button id="build-ride" class="btn btn-outline-dark create-ride cudButton" data-toggle="modal" data-target="#rideModal">BUILD A RIDE</button>';
        domString += '<div class="rides-cards d-flex row wrap justify-content-center">';
        rides.forEach((ride) => {
          domString += individualRide.individualRideLoggedIn(ride);
        });
        domString += '</div></div></div>';
        utilities.printToDom('printComponent', domString);
      }
      $('body').on('click', '.ride-delete', deleteRide);
      $('body').on('click', '#ride-save-changes', createRide);
      $('body').on('click', '.ride-update-save-changes', updateRide);
      $('body').on('click', '.ride-edit', getRideInfo);
    })
    .catch((error) => console.error(error));
};

export default { printRides };
