import $ from 'jquery';

const printToDom = (divId, string) => {
  $(`#${divId}`).html(string);
};

export default { printToDom };
