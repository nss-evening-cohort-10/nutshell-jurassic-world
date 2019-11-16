import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import utilities from '../../helpers/utilities';

import vendorData from '../../helpers/data/vendorData';

// attach event listener for click-event to 'vendors' card
// import vendorData.js function that imports all vendor data
// when clicked, function should re-print page with other collections hidden, and full list/display of vendor cards
// when expanded, there should be the ability to either navigate away via the navbar or just close the expanded list and re-prints the homepage

import './vendors.scss';

const vendorLoginStatus = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    $('.vendor-edit').removeClass('hide');
    $('.vendor-update').removeClass('hide');
    $('.vendor-delete').removeClass('hide');
  } else {
    $('.vendor-edit').addClass('hide');
    $('.vendor-update').addClass('hide');
    $('.vendor-delete').addClass('hide');
  }
};

const singleVendorCard = (vendorInfo) => {
  const domString = `
  <div class="vendor-card col-md-6">
  <div class="card-body">
  <!--Title-->
  <h4 class="card-title">Card Title</h4>
  <div class="border-top my-3 hide"></div>
  <div id=${vendorInfo.id} class="vendor-footer d-flex justify-content-between hide">
  <button class="btn btn-warning vendor-update hide">Update Vendor Details</button>
  <button class="btn btn-danger vendor-delete hide">Close Shop</button>
  </div>
  </div>
  </div>
  </div>
  `;
  console.log(vendorInfo.id);
  return domString;
};

const printAllVendors = () => {
  $('#home-page').addClass('hide');
  $('#dinosaurs').addClass('hide');
  $('#equipment').addClass('hide');
  $('#staff').addClass('hide');
  $('#vendors').removeClass('hide');
  $('#rides').addClass('hide');

  vendorData.getAllVendors()
    .then((vendors) => {
      let domString = '';
      domString += '<div class="card">';
      domString += '<div class="card-body">';
      domString += '<button class="btn btn-success" id="openVendor}">open new vendor</button>';
      domString += `<h5 class="card-title">${vendorData.name}</h5>`;
      domString += `<p class="card-text">${vendorData.description}</p>`;
      domString += '<div id="buttonDiv">';
      vendors.forEach((vendor) => {
        domString += singleVendorCard(vendor);
      });
      domString += '</div></div>';
      console.log('nice');
      utilities.printToDom('vendors', domString);
      vendorLoginStatus();
    })
    .catch((error) => console.error(error));
};

// click event to trigger printAllVendors
const showAllVendors = () => {
  console.log('click event');
  // if 'card.name' === 'vendors') {
  printAllVendors();
};

export default { showAllVendors, vendorLoginStatus };
