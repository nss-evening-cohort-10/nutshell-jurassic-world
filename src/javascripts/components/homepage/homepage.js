import $ from 'jquery';
import './homepage.scss';
import utilities from '../../helpers/utilities';

import dinos from '../dinos/dinos';
import rides from '../rides/rides';
import equipment from '../equipment/equipment';
import allStaff from '../allStaff/allStaff';
import vendors from '../vendors/vendors';
import blue from './assets/blue.jpg';
import chaosLog from '../ChaosLog/chaosLog';

const homepageArr = [
  {
    name: 'dinosaurs',
    imageUrl: `${blue}`,
    description: `Come see our extensive menagerie of prehistoric wonders! These amazing animals have been brought back from extinction after millions of years to thrill young and old with 
    their beauty and wonder!`,
  },
  {
    name: 'equipment',
    imageUrl: 'https://www.gannett-cdn.com/presto/2019/10/30/PBAC/24bbda49-846b-4615-a200-436bbf7b2e4f-1030jurassicpark05.JPG',
    description: 'Jurassic World is a progressive & dynamic zoological park located just off the coast of Costa Rica. There are many pieces of equipment required for day to day operations.',
  },
  {
    name: 'rides',
    imageUrl: 'https://cdn.collider.com/wp-content/uploads/2015/06/jurassic-world-movie-image.jpg',
    description: 'Looking for thrills? Well, you\'ve found them. In fact, you\'ve found some of the fastest, tallest, wildest, gut-wrenchingest rides in the world - hold on to your butts!',
  },
  {
    name: 'staff',
    imageUrl: 'http://secureservercdn.net/184.168.47.225/6d8.54c.myftpupload.com/wp-content/uploads/2014/11/keepers2017.jpg',
    description: 'The expertise of the animal care staff & paleozoologists who work with our dinosaurs are invaluable assets to our community.',
  },
  {
    name: 'vendors',
    imageUrl: 'https://busites-www.s3.amazonaws.com/blog-margaritaville/2016/06/jurassicworld.jpg',
    description: 'Get your stretchy pants ready! We have T-Rex Legs, Dino-sized cookies, and the original Margaritaville. Don\'t forget to stop by our souvenir shops!',
  },
  {
    name: 'chaos log',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80',
    description: 'Chaos exists!  Keeping track of all the chaos in Jurassic Park since 2019.',
  },
];


const imageClickEvent = (e) => {
  const target = e.target.id.split('hp-')[1];
  if (target === 'dinosaurs') {
    dinos.printDinos();
  } else if (target === 'rides') {
    rides.printRides();
  } else if (target === 'equipment') {
    equipment.printEquipment();
  } else if (target === 'staff') {
    allStaff.buildAllStaff();
  } else if (target === 'vendors') {
    vendors.showAllVendors();
  } else if (target === 'chaos log') {
    chaosLog.printChaosLog();
  }
};

const createHomepageCards = (arr) => {
  let domString = '<div id="home-page"><div class="card-group d-flex home-page-cards">';
  arr.forEach((card) => {
    domString += '<div class="card single-card">';
    domString += `<div class="crop-image"><img src="${card.imageUrl}" class="homepage-image" alt="${card.name}" id="hp-${card.name}"></div>`;
    domString += '<div class="card-body">';
    domString += `<h5 class="homepage-card-title card-title">${card.name}</h5>`;
    domString += `<p class="card-text">${card.description}</p>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div></div>';
  utilities.printToDom('printComponent', domString);
  $('#home-page').on('click', '.homepage-image', imageClickEvent);
};

const buildHomepageCards = () => {
  createHomepageCards(homepageArr);
};

export default { buildHomepageCards };
