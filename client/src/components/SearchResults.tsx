import styled from 'styled-components';

interface ISearchResultsProps {
  text: string;
  data: { jobs: any[]; users: any[]; companies: any[] };
}

export default function SearchResults({ text, data }: ISearchResultsProps) {
  // Check if there is any data.
  // If there isn't any data, return message to display nothing has been found.
  if (Object.values(data).every((d) => d.length === 0)) {
    return (
      <NotFoundMessage>No data exists with the term "{text}"</NotFoundMessage>
    );
  }

  return (
    <>
      {data.jobs.length > 0 && (
        <>
          <DataCategory>Jobs</DataCategory>
          <SearchResultsWrapper>
            {data.jobs.map((data) => (
              <DataWrapper key={data.id}>
                <div>{data.name}</div>
                <small style={{ color: '#aaa' }}>{data.description}</small>
              </DataWrapper>
            ))}
          </SearchResultsWrapper>
        </>
      )}
      {data.users.length > 0 && (
        <>
          <DataCategory>Users</DataCategory>
          <SearchResultsWrapper>
            {data.users.map((data) => (
              <UserWrapper key={data.id}>
                <Avatar src={data.avatar} />
                <div>
                  <div>{data.name}</div>
                  <small style={{ color: '#aaa' }}>{data.description}</small>
                </div>
              </UserWrapper>
            ))}
          </SearchResultsWrapper>
        </>
      )}
      {data.companies.length > 0 && (
        <>
          <DataCategory>Companies</DataCategory>
          <SearchResultsWrapper>
            {data.companies.map((data) => (
              <DataWrapper key={data.id}>
                <div>{data.name}</div>
                <small style={{ color: '#aaa' }}>{data.description}</small>
              </DataWrapper>
            ))}
          </SearchResultsWrapper>
        </>
      )}
    </>
  );
}

const SearchResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding-inline: 20px;
`;

const DataCategory = styled.div`
  padding: 8px;
  margin-top: 16px;
  margin-bottom: 12px;
  border-bottom: thin solid #555;
  color: #ddd;
  font-weight: 700;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #333;
`;

const UserWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const NotFoundMessage = styled.p`
  margin-top: 20px;
  padding: 10px 16px;
  background-color: rgba(255, 0, 0, 0.05);
  border-left: thick solid rgba(255, 0, 0, 0.2);
  font-size: 14px;
  line-height: 20px;
`;

const DataWrapper = styled.div`
  cursor: pointer;
`;
