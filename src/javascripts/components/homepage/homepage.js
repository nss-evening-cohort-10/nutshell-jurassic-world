import $ from 'jquery';
import './homepage.scss';


import utilities from '../../helpers/utilities';
import dinos from '../dinos/dinos';
import rides from '../rides/rides';
import vendors from '../vendors/vendors';
import allStaff from '../allStaff/allStaff';

const homepageArr = [
  {
    name: 'dinosaurs',
    imageUrl: 'https://i.imgur.com/0sS6UxM.png',
    description: 'Cetiosauriscus Elaltitan Tarbosaurus.',
  },
  {
    name: 'equipment',
    imageUrl: 'https://www.gannett-cdn.com/presto/2019/10/30/PBAC/24bbda49-846b-4615-a200-436bbf7b2e4f-1030jurassicpark05.JPG',
    description: 'Cumnoria Patagosaurus Polacanthus Cruxicheiros.',
  },
  {
    name: 'rides',
    imageUrl: 'https://cdn.collider.com/wp-content/uploads/2015/06/jurassic-world-movie-image.jpg',
    description: 'Cruxicheiros Kotasaurus Diclonius Kazaklambia.',
  },
  {
    name: 'staff',
    imageUrl: 'http://secureservercdn.net/184.168.47.225/6d8.54c.myftpupload.com/wp-content/uploads/2014/11/keepers2017.jpg',
    description: 'Kazaklambia Sellosaurus Tetragonosaurus Cetiosauriscus Elaltitan Tarbosaurus.',
  },
  {
    name: 'vendors',
    imageUrl: 'https://busites-www.s3.amazonaws.com/blog-margaritaville/2016/06/jurassicworld.jpg',
    description: 'Kotasaurus Diclonius Kazaklambia Sellosaurus Tetragonosaurus Cetiosauriscus.',
  },
];

const imageClickEvent = (e) => {
  const target = e.target.id.split('hp-')[1];
  if (target === 'dinosaurs') {
    dinos.printDinos();
  } else if (target === 'rides') {
    rides.printRides();
    $('#home-page').empty();
  } else if (target === 'vendors') {
    vendors.showAllVendors();
  } else if (target === 'staff') {
    allStaff.buildAllStaff();
    $('#home-page').empty();
  }
};

const createHomepageCards = (arr) => {
  let domString = '<div class="card-group d-flex home-page-cards">';
  arr.forEach((card) => {
    domString += '<div class="card single-card">';
    domString += `<div class="crop-image"><img src="${card.imageUrl}" class="homepage-image" alt="${card.name}" id="hp-${card.name}"></div>`;
    domString += '<div class="card-body">';
    domString += `<h5 class="homepage-card-title card-title">${card.name}</h5>`;
    domString += `<p class="card-text">${card.description}</p>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  utilities.printToDom('home-page', domString);
  $('#home-page').on('click', '.homepage-image', imageClickEvent);
};

const buildHomepageCards = () => {
  createHomepageCards(homepageArr);
};

export default { buildHomepageCards };
