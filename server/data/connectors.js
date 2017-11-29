import { Sequelize } from 'sequelize';
import { _ } from 'lodash';

import { seedFlavors, seedManufacturers } from './seeders';

// See https://github.com/sequelize/sequelize/issues/8417 for more information about the `operatorsAliases` configuration
const Op = Sequelize.Op;

const db = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: './vapr-makr.sqlite',
  operatorsAliases: Op,
});

const FlavorModel = db.define('flavor', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(256),
    allowNull: false,
  },
  manufacturerId: {
    type: Sequelize.MEDIUMINT,
    allowNull: true,
  },
});

const ManufacturerModel = db.define('manufacturer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  manufacturerId: {
    type: Sequelize.MEDIUMINT,
    allowNull: false,
  },
  shortName: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  longName: {
    type: Sequelize.STRING(256),
    allowNull: false,
  },
});

FlavorModel.hasOne(ManufacturerModel, { foreignKey: 'id' });

const Manufacturer = db.models.manufacturer;
const Flavor = db.models.flavor;

db.sync({ force: true }).then(() => {
  seedFlavors(Flavor);
  seedManufacturers(Manufacturer);
});

export { Flavor, Manufacturer };
