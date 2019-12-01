// import $ from 'jquery';
import chaosLogTitle from './assets/chaosLogTitle.png';

import chaosLogData from '../../helpers/data/chaosLogData';

import utilities from '../../helpers/utilities';

import './chaosLog.scss';

const printChaosLog = () => {
  chaosLogData.getLogEntries()
    .then((logDatas) => {
      let domString = `<div class="row justify-content-center" id="dinoTitle"><img src=${chaosLogTitle}></div>
      <table id="chaosLogTable">
        <tr>
          <th>Date/Time</th>
          <th>Event Details</th>
        </tr>
      `;
      logDatas.forEach((logData) => {
        domString += `
        <tr>
          <td>${logData.dateTime}</td>
          <td>${logData.incidentDescription}</td>
        </tr>`;
      });
      domString += '</table>';
      utilities.printToDom('printComponent', domString);
    })
    .catch((error) => console.error(error));
};

export default { printChaosLog };
