import Axios from 'axios';

// import axios from 'axios';
// import apiKeys from './apiKeys.json';



const baseUrl = apiKeys.firebaseKeys.databaseURL;


// steps to take:
// function that imports vendor data from database
// converts vendor data from object of objects to array
// delivers array in response

const getAllVendors = () => new Promise ((resolve, reject) => {
  console.log('test');
  Axios.get(`${baseUrl}/vendors.json`)
    .then((response) => {
      const demVendors = response.data;
      const vendors = [];
      Object.keys(demVendors).forEach((fbId) => {
        demVendors[fbId].id = fbId;
        vendors.push(demVendors[fbId]);
      });
      resolve(vendors);
    })
    .catch((error) => reject(error));
});

export default { getAllVendors };
