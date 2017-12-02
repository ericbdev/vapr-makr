import gql from 'graphql-tag';

const addFlavorMutation = gql`
  mutation addFlavor($flavor: FlavorInput) {
    addFlavor(input: $flavor) {
      id
      name
      manufacturer {
        id
        longName
        shortName
      }
    }
  }
`;
export {
  addFlavorMutation,
};
