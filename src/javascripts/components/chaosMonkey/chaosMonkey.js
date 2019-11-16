import './chaosMonkey.scss';

const cron = require('cron');

const chaosMonkey = cron.job('0 15 * * 0-6', () => console.log('Its 2:03'));

export default { chaosMonkey };
