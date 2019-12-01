// import $ from 'jquery';

import chaosLogData from '../../helpers/data/chaosLogData';

import utilities from '../../helpers/utilities';

import './chaosLog.scss';

const printChaosLog = () => {
  chaosLogData.getLogEntries()
    .then((logDatas) => {
      let domString = '';
      logDatas.forEach((logData) => {
        domString += `
        <p>
        <span>${logData.dateTime}</span>
        <span> --- </span>
        <span>${logData.incidentDescription}</span>
        </p>`;
      });
      utilities.printToDom('printComponent', domString);
    })
    .catch((error) => console.error(error));
};

export default { printChaosLog };
