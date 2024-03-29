const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
  const planetConfirmed = planet['koi_disposition'] === 'CONFIRMED';
  const solarFlux = planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11;
  const planetRadii = planet['koi_prad'] < 1.6;

  return planetConfirmed && solarFlux && planetRadii;
};

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    const datapath = path.join(
      __dirname,
      '..',
      '..',
      'data',
      'kepler_data.csv'
    );
    fs.createReadStream(datapath)
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', (data) => {
        if (isHabitablePlanet(data)) habitablePlanets.push(data);
      })
      .on('error', (err) => {
        console.log(`🔎 | Planets Model | error | ERROR:`, err);
        reject(err);
      })
      .on('end', () => {
        console.log(
          `🔎 | Planets Model | end | ${habitablePlanets.length} habitable planets found!`
        );
        resolve();
      });
  });
}

function getAllPlanets() {
  return habitablePlanets;
}

module.exports = { loadPlanetsData, getAllPlanets };
