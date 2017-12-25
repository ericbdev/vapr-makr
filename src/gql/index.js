import { flavorListQuery } from './queries/flavors';
import { recipesListQuery } from './queries/recipes';
import { addFlavorMutation } from './mutations/flavors';

const queries = {
  flavorListQuery,
  recipesListQuery,
};

const mutations = {
  addFlavorMutation,
};

export {
  queries,
  mutations,
};
