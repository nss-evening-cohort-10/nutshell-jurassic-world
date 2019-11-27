import $ from 'jquery';
import authData from './data/authData';

const printToDom = (divId, stringToPrint) => {
  $(`#${divId}`).html(stringToPrint);
  authData.checkForUser();
};

export default { printToDom };
