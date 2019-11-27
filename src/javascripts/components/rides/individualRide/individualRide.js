import './individualRide.scss';

const individualRideLoggedIn = (ride) => {
  const domString = `<div class="ride-card card col-md-3 m-3">
    <img src="${ride.imgUrl}" class="card-img-top" alt="${ride.name}">
    <div class="card-body">
      <h5 class="card-title">${ride.name}</h5>
    </div>
    <div class="card-footer row">
    <button id="edit-${ride.id}" data-toggle="modal" data-target="#rideUpdateModal" class="ride-edit hide btn btn-dark">Update Ride</button>
    <button id="delete-${ride.id}" class="ride-delete hide btn btn-dark">Shutdown Ride</button>
    </div>
  </div>`;
  return domString;
};

export default { individualRideLoggedIn };
