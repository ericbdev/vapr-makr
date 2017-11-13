const manufacturerList = [
  {
    id: 1,
    shortName: 'CAP',
    longName: 'Capella',
  },
  {
    id: 2,
    shortName: 'TPA',
    longName: 'The Perfumers/Flavor Apprentice',
  },
  {
    id: 3,
    shortName: 'FW',
    longName: 'Flavor West',
  },
];

/**
 * Map a manufacturer id to its name
 *
 * @param id
 * @param nameLength
 * @returns {*}
 */
function getManufacturerName(id, nameLength = 'longName') {
  const manufacturer = manufacturerList.filter(key => key.id === id)[0];
  return manufacturer[nameLength];
}

export {
  manufacturerList,
  getManufacturerName,
};
