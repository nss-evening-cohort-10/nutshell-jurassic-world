import $ from 'jquery';
import '@fortawesome/fontawesome-free/js/all';
import firebase from 'firebase/app';
import 'firebase/auth';

import rideData from '../../helpers/data/rideData';
import individualRide from './individualRide/individualRide';
import utilities from '../../helpers/utilities';

import './rides.scss';
import title from './rides_assets/jwtitle.jpg';

const rideLoginStatus = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    $('.border-top').removeClass('hide');
    $('.ride-footer').removeClass('hide');
    $('.ride-edit').removeClass('hide');
    $('.ride-delete').removeClass('hide');
    $('#build-ride').removeClass('hide');
  } else {
    $('.border-top').addClass('hide');
    $('.ride-footer').addClass('hide');
    $('.ride-edit').addClass('hide');
    $('.ride-delete').addClass('hide');
    $('#build-ride').addClass('hide');
  }
};

const printRides = () => {
  $('#home-page').addClass('hide');
  $('#dinosaurs').addClass('hide');
  $('#equipment').addClass('hide');
  $('#staff').addClass('hide');
  $('#vendors').addClass('hide');
  $('#rides').removeClass('hide');

  rideData.getRides()
    .then((rides) => {
      let domString = `<div class="img-container"><img src="${title}" class="rides-title" alt="title" /></div>`;
      domString += '<div class="center"><button id="build-ride" class="btn btn-outline-secondary create-ride hide">BUILD</button>';
      domString += '<div class="rides-cards container"><div class="card-deck row">';
      rides.forEach((ride) => {
        domString += individualRide.individualRideLoggedIn(ride);
      });
      domString += '</div></div></div>';
      utilities.printToDom('rides', domString);
      rideLoginStatus();
    })
    .catch((error) => console.error(error));
};

export default { printRides, rideLoginStatus };
