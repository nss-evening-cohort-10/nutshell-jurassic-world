import $ from 'jquery';

const printToDom = (divId, stringToPrint) => {
  $(`#${divId}`).html(stringToPrint);
  console.log('Im printing');
};

export default { printToDom };
