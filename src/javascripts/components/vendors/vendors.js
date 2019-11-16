import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import utilities from '../../helpers/utilities';

import vendorData from '../../helpers/data/vendorData';

import './vendors.scss';

const vendorLoginStatus = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    $('.vendor-add').removeClass('hide');
    $('.vendor-update').removeClass('hide');
    $('.vendor-delete').removeClass('hide');
  } else {
    $('.vendor-add').addClass('hide');
    $('.vendor-update').addClass('hide');
    $('.vendor-delete').addClass('hide');
  }
};

const singleVendorCard = (vendorInfo) => {
  const domString = `
  <div class="vendor-card col-md-3">
    <div class="card-body">
      <div class="border-top my-3 hide"></div>
      <div class="view overlay">
      <img class="card-img-top" src="${vendorInfo.img}" alt="Card image cap">
      <a href="#!">
        <div class="mask rgba-white-slight"></div>
      </a>
    </div>
        <h4 class="card-title" id="${vendorInfo.id}">${vendorInfo.name}</h4>
        <h6 id="">${vendorInfo.description}</h6>
        <h6 id="">category: ${vendorInfo.type}</h6>
        <div class="vendor-footer d-flex justify-content-between hide">
          <button class="btn btn-warning vendor-update hide">Update Vendor Details</button>
          <button class="btn btn-danger vendor-delete hide">Close Shop</button>
        </div>
    </div>
  </div>
  `;
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
      domString += '<button class="btn btn-success vendor-add">open new vendor</button>';
      domString += '<div id="buttonDiv">';
      vendors.forEach((vendor) => {
        domString += singleVendorCard(vendor);
      });
      domString += '</div></div></div>';
      utilities.printToDom('vendors', domString);
      vendorLoginStatus();
    })
    .catch((error) => console.error(error));
};

// click event to trigger printAllVendors
const showAllVendors = () => {
  // if 'card.name' === 'vendors') {
  printAllVendors();
};

export default { showAllVendors, vendorLoginStatus };
