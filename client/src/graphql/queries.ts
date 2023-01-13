import { gql, request } from 'graphql-request';

import { GRAPHQL_URL } from '../utils/constants';

export async function getAllDataByText(text: string) {
  // graphql query to be sent to server
  const query = gql`
    query GetAllDataByText($text: String!) {
      jobsByTitle(text: $text) {
        id
        description
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
        job {
          id
          description
          title
        }
      }
    }
  `;
  // query variable
  const variables = { text };
  // destructure data
  const {
    jobsByTitle: jobs,
    companiesByName: companies,
    usersByFullname: users,
  } = await request(GRAPHQL_URL, query, variables);
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
