import gql from 'graphql-tag';

const recipesListQuery = gql`
  query recipesListQuery {
    allRecipes {
      id
      name
  }
}
`;

export {
  recipesListQuery,
};
