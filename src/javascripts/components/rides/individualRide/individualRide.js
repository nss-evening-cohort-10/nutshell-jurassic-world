import './individualRide.scss';

const individualRideLoggedIn = (ride) => {
  const domString = `
  <div class="ride-card col-xs-6 col-sm-6 col-md-6">
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
    <div id=${ride.id} class="ride-footer d-flex justify-content-between hide">
    <i class="ride-edit hide fas fa-pen"></i>
    <i class="ride-delete hide fas fa-times"></i>
    </div>
  </div>
</div>
</div>
`;
  return domString;
};

export default { individualRideLoggedIn };
