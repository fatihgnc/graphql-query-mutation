import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

import { GRAPHQL_URL } from '../utils/constants';

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export const GET_DATA_BY_TEXT_QUERY = gql`
  query GetAllDataByText($text: String!) {
    jobs: jobsByTitle(text: $text) {
      id
      description
      title
    }
    companies: companiesByName(text: $text) {
      id
      name
      description
      availableJobs {
        description
        id
        title
      }
    }
    users: usersByFullname(text: $text) {
      id
      fullname
      avatar
      job {
        title
      }
      company {
        description
        id
        name
        availableJobs {
          id
          description
          title
        }
      }
    }
  }
`;
