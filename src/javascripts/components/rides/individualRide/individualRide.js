import './individualRide.scss';

const individualRideLoggedIn = (ride) => {
  const domString = `<div class="ride-card card col-sm-3 m-3">
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

/* <div class="ride-card col-xs-6 col-sm-6 col-md-6">
<div class="card mb-4">
  <div class="view overlay">
    <img class="card-img-top" src="${ride.imgUrl}" alt="Card image cap">
    <a href="#!">
      <div class="mask rgba-white-slight"></div>
    </a>
  </div>
  <div class="card-body">
    <!--Title-->
    <h4 class="card-title">${ride.name}</h4>
    <div class="border-top my-3 hide"></div>
    <div class="ride-footer d-flex justify-content-between hide">
    <button id="edit-${ride.id}" data-toggle="modal" data-target="#rideUpdateModal" class="ride-edit hide btn btn-outline-secondary">DECONSTRUCT</button>
    <button id="delete-${ride.id}" class="ride-delete hide btn btn-outline-secondary">SHUTDOWN</button>
    </div>
  </div>
</div>
</div> */

export default { individualRideLoggedIn };
