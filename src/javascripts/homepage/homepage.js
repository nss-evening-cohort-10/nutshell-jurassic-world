import './homepage.scss';
import utilities from '../helpers/utilities';

const homepageArr = [
  {
    name: 'dinosaurs',
    imageUrl: 'https://i.pinimg.com/736x/0d/ed/cd/0dedcd8ba172241c16320e4548fc309c.jpg',
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

const createHomepageCards = (arr) => {
  let domString = '<div class="card-group d-flex home-page-cards">';
  arr.forEach((card) => {
    domString += '<div class="card single-card">';
    domString += `<div class=crop-image><img src="${card.imageUrl}" class="homepage-image card-img-top" alt="${card.name}"></div>`;
    domString += '<div class="card-body">';
    domString += `<h5 class="homepage-card-title card-title">${card.name}</h5>`;
    domString += `<p class="card-text">${card.description}</p>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  utilities.printToDom('home-page', domString);
};

const buildHomepageCards = () => {
  createHomepageCards(homepageArr);
};

export default { buildHomepageCards };
