import { List, Map } from 'immutable';

function createRecipeFlavor(flavor = '', amount = 0) {
  return Map({
    amount,
    flavor,
  });
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
    flavors: [
      createRecipeFlavor(),
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
      flavors: List(uniform.flavors),
    }),
  });

}

export {
  createRecipeFlavor,
  shapeRecipe,
};
