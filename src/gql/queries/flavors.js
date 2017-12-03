import gql from 'graphql-tag';

const flavorListQuery = gql`
  query FlavorListQuery {
    allFlavors {
      id
      name,
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