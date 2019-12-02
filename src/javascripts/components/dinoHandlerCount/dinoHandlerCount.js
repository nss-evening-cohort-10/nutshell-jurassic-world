import dinoStaffData from '../../helpers/data/dinoStaffData';

const dinoAlert = () => {
  dinoStaffData.getDinoStaff()
    .then((dinoStaff) => {
      dinoStaff.forEach((dinoEmployee) => {
        if (dinoEmployee.dinoId === 'dino1') {
          const newArray = [];
          newArray.push(dinoEmployee);
          console.error(newArray, 'from handler count file');
        }
      });
    })
    .catch((error) => console.error(error));
};

export default { dinoAlert };
