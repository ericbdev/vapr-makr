import gql from 'graphql-tag';

const flavorListQuery = gql`
  query FlavorListQuery {
    allFlavors {
      flavorId
      name
      manufacturer {
        id
        shortName
        longName
      }
    }
  }
`;

export {
  flavorListQuery,
};
