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
    imageUrl: 'https://jurassicoutpost.com/wp-content/uploads/2019/01/Jurassic-World-IOA-Coaster-Update.png',
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
  console.log('check');
  let domString = '<div class="card-group home-page-cards">';
  for (let i = 0; i < arr.length; i += 0) {
    domString += '<div class="card">';
    domString += `<img src="${arr.imageUrl}" class="card-img-top" alt="${arr.name}">`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-title">${arr.name}</h5>`;
    domString += `<p class="card-text">${arr.description}</p>`;
    domString += '</div>';
  }
  domString += '</div>';
  utilities.printToDom('home-page', domString);
};

const buildHomepageCards = () => {
  createHomepageCards(homepageArr);
};

export default { buildHomepageCards };
