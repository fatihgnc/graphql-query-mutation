import { useLazyQuery } from '@apollo/client';

import { GET_DATA_BY_TEXT_QUERY } from '../..';

export const useGetDataByText = (text: string) => {
  const [getData, { loading, error }] = useLazyQuery(GET_DATA_BY_TEXT_QUERY, {
    fetchPolicy: 'network-only',
    variables: { text },
  });

  const onPerformQuery = async () => {
    const {
      data: { jobs, companies, users },
    } = await getData({});
    // process data
    return [...jobs, ...companies, ...users].reduce(
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
  };
  return { loading, error: !!error, onPerformQuery };
};
