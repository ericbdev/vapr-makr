import { flavorListQuery } from './queries/flavors';
import { recipesListQuery, recipesViewQuery } from './queries/recipes';
import { addFlavorMutation } from './mutations/flavors';

const queries = {
  flavorListQuery,
  recipesListQuery,
  recipesViewQuery,
};

const mutations = {
  addFlavorMutation,
};

export {
  queries,
  mutations,
};
