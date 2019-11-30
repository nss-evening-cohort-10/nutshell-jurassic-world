import dinoData from './dinoData';
import dinoStaffData from './dinoStaffData';
import rideData from './rideData';
import rideStaffData from './rideStaffData';
import shiftsData from './shiftsData';
import scheduleBuilder from '../../components/schedule/scheduleDomStringBuilders';

// Smash assignments into collection, ie: rides + rideStaff

const getDinosWithAssignment = () => new Promise((resolve, reject) => {
  dinoData.getDinosaurs().then((allDinos) => {
    dinoStaffData.getDinoStaff().then((assignedDinos) => {
      const allDinosWithAssignment = [];
      allDinos.forEach((dino) => {
        const newDino = { ...dino };
        const assigned = assignedDinos.filter((x) => x.dinoId === newDino.id);
        newDino.assignments = [];
        if (assigned) {
          assigned.forEach((match) => {
            newDino.assignments.push(match);
          });
        }
        allDinosWithAssignment.push(newDino);
      });
      resolve(allDinosWithAssignment);
    });
  }).catch((err) => reject(err));
});

const getRidesWithAssignment = () => new Promise((resolve, reject) => {
  rideData.getRides().then((allRides) => {
    rideStaffData.getRideStaff().then((assignedRides) => {
      const allRidesWithAssignment = [];
      allRides.forEach((ride) => {
        const newRide = { ...ride };
        const assigned = assignedRides.filter((x) => x.rideId === newRide.id);
        newRide.assignments = [];
        if (assigned) {
          assigned.forEach((match) => {
            newRide.assignments.push(match);
          });
        }
        allRidesWithAssignment.push(newRide);
      });
      resolve(allRidesWithAssignment);
    });
  }).catch((err) => reject(err));
});

// Smash assignments & shift into collection, ie: rides + rideStaff + shifts

const findDinoShifts = () => new Promise((resolve, reject) => {
  getDinosWithAssignment().then((dinoAssignments) => {
    console.log('check1', dinoAssignments);
    shiftsData.getShifts().then((allShifts) => {
      console.log('check2', allShifts);
      const openDinoShifts = [];
      const takenDinoShifts = [];
      dinoAssignments.forEach((dino) => {
        console.log('dino open', dino);
        const newDino = { ...dino };
        const assignedShifts = newDino.assignments;
        allShifts.forEach((shift) => {
          const newShift = { ...shift };
          const matchShift = assignedShifts.filter((x) => x.shiftId === newShift.id);
          if (matchShift[1]) {
            matchShift.forEach((timeMatch) => {
              console.log('timematch', timeMatch);
              const storeShift = timeMatch;
              storeShift.shiftDetails = newShift;
              console.log('store', storeShift);
            });
            takenDinoShifts.push(newDino);
          } else if (matchShift[0]) {
            matchShift.forEach((timeMatch) => {
              console.log('timematch', timeMatch);
              const storeShift = timeMatch;
              storeShift.shiftDetails = newShift;
              console.log('store', storeShift);
            });
            takenDinoShifts.push(newDino);
            newShift.dinoId = newDino.id;
            newShift.dinoName = newDino.name;
            openDinoShifts.push(newShift);
          } else {
            newShift.dinoId = newDino.id;
            newShift.dinoName = newDino.name;
            openDinoShifts.push(newShift);
          }
        });
      });
      console.log('taken', takenDinoShifts);
      console.log('open', openDinoShifts);
      const buildString = scheduleBuilder.dinoScheduleBuilder(openDinoShifts, takenDinoShifts);
      resolve(buildString);
    });
  }).catch((err) => reject(err));
});

const findRideShifts = () => new Promise((resolve, reject) => {
  getRidesWithAssignment().then((rideAssignments) => {
    console.log('check1', rideAssignments);
    shiftsData.getShifts().then((allShifts) => {
      const openRideShifts = [];
      const takenRideShifts = [];
      rideAssignments.forEach((ride) => {
        if (ride.isOperational === true) {
          const newRide = { ...ride };
          const assignedShifts = newRide.assignments;
          allShifts.forEach((shift) => {
            const newShift = { ...shift };
            const matchShift = assignedShifts.filter((x) => x.shiftId === newShift.id);
            if (matchShift[0]) {
              matchShift.forEach((timeMatch) => {
                const storeShift = timeMatch;
                storeShift.shiftDetails = newShift;
              });
              takenRideShifts.push(newRide);
            } else {
              newShift.rideId = newRide.id;
              newShift.rideName = newRide.name;
              openRideShifts.push(newShift);
            }
          });
        }
      });
      const buildString = scheduleBuilder.rideScheduleBuilder(openRideShifts, takenRideShifts);
      resolve(buildString);
    });
  }).catch((err) => reject(err));
});

export default { findDinoShifts, findRideShifts };
