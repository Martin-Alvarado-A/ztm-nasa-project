const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X', // Client
  rocket: 'Explorer IS1', // Client
  launchDate: new Date('December 27, 2030'), // Client
  target: 'Kepler-442 b', // Client
  customer: ['NASA', 'ZTM'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customer: ['Zero To Mastery', 'NASA'],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunchById(launchId) {}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
