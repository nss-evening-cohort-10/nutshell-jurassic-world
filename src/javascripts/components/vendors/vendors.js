// import $ from 'jquery';
// import utilities from '../../helpers/utilities';

// attach event listener for click-event to 'vendors' card
// import vendorData.js function that imports all vendor data
// when clicked, function should re-print page with other collections hidden, and full list/display of vendor cards
// when expanded, there should be the ability to either navigate away via the navbar or just close the expanded list and re-prints the homepage


const printAllVendors = () => {
  console.log('this should be all the vendors from vendors.js');
  // do the thing (i.e., loop over vendor data to print cards with each item and two buttons that don't work yet.)
  // let domString = '';
  // domString += '<div class="card" style="width: 18rem;">';
  // domString += '<div class="card-body">';
  // domString += `<h5 class="card-title">${vendorData.name}</h5>`;
  // domString += `<p class="card-text">${vendorData.description}</p>`;
  // domString += '<div id="buttonDiv">';
  // domString += '<button class="btn btn-primary" id="openVendor}">open new vendor</button>';
  // domString += '<button class="btn btn-dark" id="closeVendor">close up</button>';
  // domString += '</div>';
  // domString += '</div>';
  // domString += '</div>';
  // }
};

// click event to trigger printAllVendors
const showAllVendors = () =>{
  console.log('click event');
  // if 'card.name' === 'vendors') {
  printAllVendors();
};

export default { showAllVendors };
