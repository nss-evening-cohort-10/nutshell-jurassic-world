import $ from 'jquery';

const printToDom = (divId, stringToPrint) => {
  $(`#${divId}`).html(stringToPrint);
};

export default { printToDom };
