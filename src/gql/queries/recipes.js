import gql from 'graphql-tag';

const recipesListQuery = gql`
  query recipesListQuery {
    allRecipes {
      id
      name
    }
  }
`;

const recipesViewQuery = gql`
  query recipeViewQuery($recipeId: ID!) {
    singleRecipe(id: $recipeId) {
      id
      name
      resultAmount
      resultStrength
      resultVG
      resultPG
      nicStrength
      nicVG
      nicPG
      recipeItems {
        percent
        flavor {
          id
          name
          manufacturer {
            shortName
            longName
          }
        }
      }
    }
  }
`;

export {
  recipesListQuery,
  recipesViewQuery,
};
