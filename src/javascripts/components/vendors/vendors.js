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
    $('.update-vendor').removeClass('hide');
    $('.delete-vendor').removeClass('hide');
    $('.border-top').removeClass('hide');
  } else {
    $('.vendor-add').addClass('hide');
    $('.update-vendor').addClass('hide');
    $('.delete-vendor').addClass('hide');
    $('.border-top').addClass('hide');
  }
};

const singleVendorCard = (vendorInfo) => {
  const domString = `
  <div class="card vendor-card col-md-4">
    <div class="card-body">
    <div class="view overlay">
    <img class="card-img-top" src="${vendorInfo.img}" alt="Card image cap">
    <a href="#!">
    <div class="mask rgba-white-slight"></div>
    </a>
    </div>
    <h4 class="card-title" id="${vendorInfo.id}">${vendorInfo.name}</h4>
    <h6 id="">${vendorInfo.description}</h6>
    <h6 id="">category: ${vendorInfo.type}</h6>
    <div class="border-top my-3 hide"></div>
          <button class="btn btn-warning update-vendor hide" id="update-vendor">Update Vendor Details</button>
          <button class="btn btn-danger delete-vendor hide" id="delete-${vendorInfo.id}">Close Shop</button>
    </div>
  </div>
  `;
  return domString;
};

const showAllVendors = () => {
  $('#home-page').addClass('hide');
  $('#dinosaurs').addClass('hide');
  $('#equipment').addClass('hide');
  $('#staff').addClass('hide');
  $('#vendors').removeClass('hide');
  $('#rides').addClass('hide');

  vendorData.getAllVendors()
    .then((vendors) => {
      let domString = '';
      domString += '<div id="buttonDiv">';
      domString += '<button class="btn btn-success vendor-add" data-toggle="modal" data-target="#newVendorModal">open new vendor</button>';
      // eslint-disable-next-line no-use-before-define
      $('body').on('click', '.vendor-add', addVendor);
      domString += '</div>';
      domString += '<div class="container">';
      domString += '<div class="row">';
      vendors.forEach((vendor) => {
        domString += singleVendorCard(vendor);
      });
      domString += '</div></div>';
      utilities.printToDom('vendors', domString);
      // eslint-disable-next-line no-use-before-define
      $('body').on('click', '.delete-vendor', closeShop);
      vendorLoginStatus();
    })
    .catch((error) => console.error(error));
};

const closeShop = (e) => {
  const vendorToClose = e.target.id.split('delete-')[1];
  vendorData.shutDownVendor(vendorToClose)
    .then(() => {
      showAllVendors();
    })
    .catch((error) => console.error(error));
};

const addVendor = (e) => {
  e.stopImmediatePropagation();
  const newVendor = {
    type: $('#new-vendor-type').val(),
    name: $('#new-vendor-name').val(),
    description: $('#new-vendor-description').val(),
    img: $('#new-vendor-pic').val(),
  };
  vendorData.addNewVendor(newVendor)
    .then(() => {
      showAllVendors();
      $('#newVendorModal').modal('hide');
    })
    .catch((error) => console.error(error));
};

export default {
  showAllVendors,
  vendorLoginStatus,
  closeShop,
  addVendor,
};
