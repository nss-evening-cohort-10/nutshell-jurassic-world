import $ from 'jquery';
import 'firebase/auth';

import utilities from '../../helpers/utilities';

import vendorData from '../../helpers/data/vendorData';

import './vendors.scss';
import vendorTitle from './assets/images/vendorTitle.gif';

const singleVendorCard = (vendorInfo) => {
  const domString = `
  <div class="card col-3 vendor-card">
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
    </div>
    <div class="card-footer d-flex justify-content-between flex-wrap">
          <button class="btn btn-dark update-vendor cudButton" id="update-${vendorInfo.id}">Update</button>
          <button class="btn btn-dark delete-vendor cudButton" id="delete-${vendorInfo.id}">Close</button>
    </div>
    </div>
  `;
  return domString;
};

const showAllVendors = () => {
  let domString = `<div class="row justify-content-center" id="dinoTitle"><img src=${vendorTitle}></div>
  <div class="container text-center" id="buttonDiv">
  <button class="btn btn-outline-dark vendor-add cudButton" id="newVendor" data-toggle="modal" data-target="#newVendorModal">Create New Vendor</button>
  </div>
  <div class="container">
  <div class="row justify-content-center">
  `;
  vendorData.getAllVendors()
    .then((vendors) => {
      if (vendors[0]) {
        vendors.forEach((vendor) => {
          domString += singleVendorCard(vendor);
        });
        domString += '</div></div>';
        utilities.printToDom('printComponent', domString);
      }
      // eslint-disable-next-line no-use-before-define
      $('body').on('click', '.delete-vendor', closeShop);
      // eslint-disable-next-line no-use-before-define
      $('body').on('click', '.update-vendor', getVendorToUpdate);
      // eslint-disable-next-line no-use-before-define
      $('body').on('click', '.saveUpdatedVendor', updateVendor);
      // eslint-disable-next-line no-use-before-define
      $('body').on('click', '.saveVendor', addVendor);
    })
    .catch((error) => console.error(error));
};

const closeShop = (e) => {
  e.stopImmediatePropagation();
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
      $('#new-vendor-type').val('');
      $('#new-vendor-name').val('');
      $('#new-vendor-description').val('');
      $('#new-vendor-pic').val('');
    })
    .catch((error) => console.error(error));
};

const getVendorToUpdate = (e) => {
  e.stopImmediatePropagation();
  $('#updateVendorModal').modal('show');
  const vendorToUpdate = e.target.id.split('update-')[1];
  vendorData.getAllVendors()
    .then((vendors) => {
      vendors.forEach((vendor) => {
        if (vendor.id === vendorToUpdate) {
          const newId = `vendor-${vendor.id}`;
          $('#update-vendor-name').val(`${vendor.name}`);
          $('#update-vendor-pic').val(`${vendor.img}`);
          $('#update-vendor-type').val(`${vendor.type}`);
          $('#update-vendor-description').val(`${vendor.description}`);
          $('.saveUpdatedVendor').attr('id', newId);
        }
      });
    })
    .catch((error) => console.error(error));
};

const updateVendor = (e) => {
  e.stopImmediatePropagation();
  const vendorId = e.target.id.split('vendor-')[1];
  const newVendorInfo = {
    type: $('#update-vendor-type').val(),
    name: $('#update-vendor-name').val(),
    description: $('#update-vendor-description').val(),
    img: $('#update-vendor-pic').val(),
  };
  vendorData.updateVendorInfo(vendorId, newVendorInfo)
    .then(() => {
      $('#updateVendorModal').modal('hide');
      showAllVendors();
    })
    .catch((error) => console.error(error));
};

export default {
  showAllVendors,
  closeShop,
  addVendor,
};
