// import $ from 'jquery';
import chaosLogTitle from './assets/chaosLogTitle.png';

import chaosLogData from '../../helpers/data/chaosLogData';

import utilities from '../../helpers/utilities';

import './chaosLog.scss';

// const addNewEntry = (e) => {
//   e.stopImmediatePropagation();
//   const newLogEntry = {

//   };
// };

const printChaosLog = () => {
  chaosLogData.getLogEntries()
    .then((logDatas) => {
      let domString = `<div class="row justify-content-center" id="dinoTitle"><img src=${chaosLogTitle}></div>
      <div id="chaosTableContainer" class="mx-5">
      <table id="chaosLogTable" class="table table-hover mt-5">
        <thead>
          <tr>
            <th scope="col">Date/Time</th>
            <th scope="col">Event Details</th>
          </tr>
        </thead>
        <tbody>
      `;
      logDatas.forEach((logData) => {
        domString += `
        <tr>
          <td>${logData.dateTime}</td>
          <td>${logData.incidentDescription}</td>
        </tr>`;
      });
      domString += '</tbody></table></div>';
      utilities.printToDom('printComponent', domString);
    })
    .catch((error) => console.error(error));
};

export default { printChaosLog };
