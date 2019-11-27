import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
// import dinosaurs from '../../components/dinos/dinos';
// import rides from '../../components/rides/rides';
// import vendors from '../../components/vendors/vendors';
// import allStaff from '../../components/allStaff/allStaff';
// import equipment from '../../components/equipment/equipment';


// const logInButton = $('#logButtons');
// const logOutButton = $('#logOutButton');


const checkForUser = () => {
  if (firebase.auth().currentUser) {
    $('.cudButton').removeClass('hide');
    $('#logOutButton').removeClass('hide');
    $('#logInButton').addClass('hide');
  } else {
    $('.cudButton').addClass('hide');
    $('#logOutButton').addClass('hide');
    $('#logInButton').removeClass('hide');
  }
};

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('.cudButton').removeClass('hide');
      $('#logOutButton').removeClass('hide');
      $('#logInButton').addClass('hide');
    } else {
      $('.cudButton').addClass('hide');
      $('#logOutButton').addClass('hide');
      $('#logInButton').removeClass('hide');
    }
  });
};

// const checkLoginStatus = () => {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       logOutButton.removeClass('hide');
//       logInButton.addClass('hide');
//       dinosaurs.userModeToggle();
//       rides.rideLoginStatus();
//       vendors.vendorLoginStatus();
//       allStaff.staffModeToggle();
//       equipment.userModeToggle();
//     } else {
//       logOutButton.addClass('hide');
//       logInButton.removeClass('hide');
//       dinosaurs.userModeToggle();
//       rides.rideLoginStatus();
//       vendors.vendorLoginStatus();
//       allStaff.staffModeToggle();
//       equipment.userModeToggle();
//     }
//   });
// };

export default { checkForUser, checkLoginStatus };
