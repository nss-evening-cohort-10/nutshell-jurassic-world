import $ from 'jquery';

const printToDom = (divId, string) => {
  $(`#${divId}`).innerhtml(string);
};

export default { printToDom };
