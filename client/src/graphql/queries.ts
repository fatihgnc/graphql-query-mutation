import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { GRAPHQL_URL } from '../utils/constants';

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export async function getAllDataByText(text: string) {
  // graphql query to be sent to server
  const query = gql`
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
  // query variable
  const variables = { text };
  // destructure data
  const {
    data: { jobs, companies, users },
  } = await client.query({ query, variables });
  // make data generic so that we can print all of them in once
  const data = [...jobs, ...companies, ...users].reduce(
    (dataByType, currentData) => {
      if (currentData.fullname) {
        // user data
        dataByType.users.push({
          ...currentData,
          type: 'user',
          name: currentData.fullname,
          description: currentData.job?.title || 'Unemployed',
        });
      } else if (currentData.name) {
        // company data
        dataByType.companies.push({
          ...currentData,
          type: 'company',
          name: currentData.name,
          description: currentData.description,
        });
      } else {
        // job data
        dataByType.jobs.push({
          ...currentData,
          type: 'job',
          name: currentData.title,
          description: currentData.description,
        });
      }
      return dataByType;
    },
    { jobs: [], users: [], companies: [] }
  );
  return data;
}
