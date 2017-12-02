// Apollo
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Setup Apollo
const graphqlURI = `//${process.env.REACT_APP_GRAPHQL_SERVER}:${process.env.REACT_APP_GRAPHQL_PORT}/graphql`;
const apolloClient = new ApolloClient({
  connectToDevTools: true,
  link: new HttpLink({ uri: graphqlURI }),
  cache: new InMemoryCache(),
});

export default apolloClient;
