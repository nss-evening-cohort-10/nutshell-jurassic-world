import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import equipmentData from '../../helpers/data/equipmentData';
import './equipment.scss';
import utilities from '../../helpers/utilities';

// const userModeToggle = () => {
//   const user = firebase.auth().currentUser;
//   if (user) {
//     $('.updateDino').removeClass('hide');
//     $('.kill').removeClass('hide');
//     $('#spawn').removeClass('hide');
//   } else {
//     $('.updateDino').addClass('hide');
//     $('.kill').addClass('hide');
//     $('#spawn').addClass('hide');
//   }
// };

const printEquipment = () => {
  $('#home-page').addClass('hide');
  $('#equipment').removeClass('hide');
  $('#staff').addClass('hide');
  $('#rides').addClass('hide');
  $('#dinosaurs').addClass('hide');

  utilities.printToDom('equipment', 'equipment');
};

export default { printEquipment };
