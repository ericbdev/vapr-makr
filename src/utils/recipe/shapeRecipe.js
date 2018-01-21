import { List, Map } from 'immutable';

/**
 *
 * @param options
 * @param options.percent {Number}
 * @param options.flavor {Object} - Object of flavor
 * @param options.flavor.flavorId {Number} - flavorId of flavor
 * @param options.flavor.name {String} - Name of flavor
 * @param options.flavor.manufacturer {Object} Manufacturer object of flavor
 * @param options.flavor.manufacturer.longName {String} - Long version of Manufacturer name
 * @param options.flavor.manufacturer.shortName {String} - Short version of Manufacturer name
 *
 * @returns {*}
 */
function createRecipeItem(options = {}) {
  const defaults = {
    percent: 0,
    flavor: {
      name: '',
      flavorId: 0,
      manufacturer: {
        longName: '',
        shortName: '',
      },
    },
  };

  return Object.assign({}, defaults, options);
}

function shapeRecipe(unshaped = {}) {
  const defaults = {
    id: 0,
    name: '',
    resultAmount: 30,
    resultStrength: 0,
    resultPG: 0,
    resultVG: 0,
    nicStrength: 0,
    nicPG: 0,
    nicVG: 0,
    recipeItems: [
      createRecipeItem(),
    ],
  };

  const uniform = {...defaults, ...unshaped};
  
  return Map({
    id: uniform.id,
    name: uniform.name,
    ingredients: Map({
      result: Map({
        amount: uniform.resultAmount,
        strength: uniform.resultStrength,
        pgRatio: uniform.resultPG,
        vgRatio: uniform.resultVG,
      }),
      nicotine: Map({
        strength: uniform.nicStrength,
        pgRatio: uniform.nicPG,
        vgRatio: uniform.nicVG,
      }),
      recipeItems: List(uniform.recipeItems),
    }),
  });
}

export {
  createRecipeItem,
  shapeRecipe,
};
