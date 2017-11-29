import flavors from '../seeds/flavors.json';
import manufacturers from '../seeds/manufacturers.json';

export const seedFlavors = (Model) => {
  flavors.forEach((item) => {
    Model.create({
      name: item.name,
      manufacturerId: item.manufacturerId,
    });
  });
};

export const seedManufacturers = (Model) => {
  manufacturers.forEach((item) => {
    Model.create({
      manufacturerId: item.manufacturerId,
      shortName: item.shortName,
      longName: item.longName,
    });
  });
};
