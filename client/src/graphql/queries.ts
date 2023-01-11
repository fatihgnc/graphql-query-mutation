import { gql, request } from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:4000/graphql';

export async function getAllDataByText(text: string) {
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
  const variables = { text };
  // destructure data
  const {
    jobsByTitle: jobs,
    companiesByName: companies,
    usersByFullname: users,
  } = await request(GRAPHQL_URL, query, variables);
  // make data generic so that we can print all of them
  const data = [...jobs, ...companies, ...users].reduce(
    (dataByType, currentData) => {
      // user data
      if (currentData.fullname) {
        dataByType.users.push({
          ...currentData,
          type: 'user',
          name: currentData.fullname,
          description: currentData.job?.title || 'Unemployed',
        });
        // company data
      } else if (currentData.name) {
        dataByType.companies.push({
          ...currentData,
          type: 'company',
          name: currentData.name,
          description: currentData.description,
        });
        // job data
      } else {
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
