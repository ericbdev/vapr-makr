import gql from 'graphql-tag';

const flavorListQuery = gql`
  query FlavorListQuery {
    allFlavors {
      flavorId
      name
      manufacturer {
        manufacturerId
        shortName
        longName
      }
    }
  }
`;

export {
  flavorListQuery,
};
