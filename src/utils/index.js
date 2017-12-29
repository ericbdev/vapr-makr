import { manufacturerList, getManufacturerName } from './manufacturers';
import { createRecipeFlavor, shapeRecipe } from './recipe';

const recipes = {
  createRecipeFlavor,
  shapeRecipe,
};

const manufacturers = {
  manufacturerList,
  getManufacturerName,
};

export {
  recipes,
  manufacturers,
};
