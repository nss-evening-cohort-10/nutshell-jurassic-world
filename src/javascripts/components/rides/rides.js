// import $ from 'jquery';

import rideData from '../../helpers/rideData';
import individualRide from './individualRide/individualRide';
import utilities from '../../helpers/utilities';

import './rides.scss';
import title from './rides_assets/jwtitle.jpg';

const printRides = () => {
  // if (user) {
  //   // do the thing
  // } else {

  rideData.getRides()
    .then((rides) => {
      let domString = `<div class="img-container"><img src="${title}" class="rides-title" alt="title" /></div>`;
      domString += '<div class="rides-cards">';
      rides.forEach((ride) => {
        domString += individualRide.individualRide(ride);
      });
      domString += '</div>';
      utilities.printToDom('rides', domString);
    })
    .catch((error) => console.error(error));
};

export default { printRides };
