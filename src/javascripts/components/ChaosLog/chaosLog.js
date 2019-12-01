import $ from 'jquery';

import chaosLogData from '../../helpers/data/chaosLogData';

// import utilities from '../../helpers/utilities';

import './chaosLog.scss';

const printChaosLog = () => {
  chaosLogData.getLogEntries()
    .then((logDatas) => {
      console.log(logDatas);
    })
    .catch((error) => console.error(error));
};

export default { printChaosLog };
