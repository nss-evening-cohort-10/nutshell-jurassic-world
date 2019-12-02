import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getLogEntries = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/chaosLog.json`)
    .then((response) => {
      const demLogs = response.data;
      const logEntries = [];
      Object.keys(demLogs).forEach((fbId) => {
        demLogs[fbId].id = fbId;
        logEntries.push(demLogs[fbId]);
      });
      resolve(logEntries);
    })
    .catch((error) => reject(error));
});

export default { getLogEntries };
