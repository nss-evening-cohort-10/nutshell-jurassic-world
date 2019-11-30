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

const findRideShifts = () => new Promise((resolve, reject) => {
  getRidesWithAssignment().then((rideAssignments) => {
    console.log('check1', rideAssignments);
    shiftsData.getShifts().then((allShifts) => {
      console.log('check2', allShifts);
      const openShifts = [];
      const takenShifts = [];
      rideAssignments.forEach((ride) => {
        if (ride.isOperational === true) {
          console.log('ride open', ride);
          const newRide = { ...ride };
          const assignedShifts = newRide.assignments;
          allShifts.forEach((shift) => {
            const newShift = { ...shift };
            const matchShift = assignedShifts.filter((x) => x.shiftId === newShift.id);
            if (matchShift[0]) {
              matchShift.forEach((timeMatch) => {
                console.log('timematch', timeMatch);
                const storeShift = timeMatch;
                storeShift.shiftDetails = newShift;
                console.log('store', storeShift);
              });
              takenShifts.push(newRide);
            } else {
              newShift.rideId = newRide.id;
              newShift.rideName = newRide.name;
              openShifts.push(newShift);
            }
          });
        }
      });
      console.log('taken', takenShifts);
      console.log('open', openShifts);
      const buildString = scheduleBuilder.scheduleDomStringBuilder(openShifts, takenShifts);
      resolve(buildString);
    });
  }).catch((err) => reject(err));
});

export default { findRideShifts };
