const makeStaff = (staff) => {
  let domString = '';
  if (staff.id) {
    domString += `
    <div class="card col-4 d-flex" id="${staff.id}">
      <img src="${staff.img}" class="card-img-top staffImg img-responsive" alt="...">
        <div class="card-body">
          <h5 class="card-title">${staff.name}</h5>
          <p class="card-text">${staff.role}</p>
          <button href="#" class="btn btn-danger hide">Fire</button>
          <button href="#" class="btn btn-success hide">Hire</button>
        </div>
    </div>
    `;
  }
  return domString;
};

export default { makeStaff };
