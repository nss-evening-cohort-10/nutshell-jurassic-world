import './chaosMonkey.scss';
import $ from 'jquery';


const cron = require('cron');

const chaosMonkey = cron.job('25 14 * * 0-6', () => {
  $('.toast').toast('show');
});

export default { chaosMonkey };
