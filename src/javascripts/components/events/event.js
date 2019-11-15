import $ from 'jquery';
import rides from '../rides/rides';

const clickEventHandler = (e) => {
  const { id } = e.target;
  if (id === 'dinosaurs') {
    // dinosaur things
  } else if (id === 'equipment') {
    // equipment things
  } else if (id === 'rides') {
    $('#home-page').empty();
    rides.printRides();
  } else if (id === 'staff') {
    // staff things
  } else if (id === 'vendors') {
    // vendor things
  }
};

export default { clickEventHandler };
