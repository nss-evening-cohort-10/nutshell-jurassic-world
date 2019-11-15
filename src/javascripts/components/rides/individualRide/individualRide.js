import './individualRide.scss';

const individualRide = (ride) => {
  const domString = `
  <div id="individual-${ride.name}" class="single-ride card mb-3">
  <div class="row no-gutters">
    <div class="col-md-7">
      <img src="${ride.imgUrl}" class="card-img" alt="...">
    </div>
    <div class="col-md-5">
      <div class="card-body">
        <h3 class="card-title">${ride.name}</h3>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div>`;
  return domString;
};

export default { individualRide };
