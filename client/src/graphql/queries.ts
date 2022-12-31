import { gql, request } from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:4000/graphql';

export async function getAllDataByText(text: string) {
  const query = gql`
    query GetAllDataByText($text: String!) {
      jobsByTitle(text: $text) {
        description
        id
        title
      }
      companiesByName(text: $text) {
        id
        name
        description
        availableJobs {
          description
          id
          title
        }
      }
      usersByFullname(text: $text) {
        fullname
        id
        company {
          description
          id
          name
          availableJobs {
            description
            id
            title
          }
        }
        job {
          description
          id
          title
        }
      }
    }
  `;
  const variables = { text };
  return await request(GRAPHQL_URL, query, variables);
}
