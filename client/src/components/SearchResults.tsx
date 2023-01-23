import styled from 'styled-components';

import { IJob } from '../types/job.types';
import { IUser } from '../types/user.types';
import { ICompany } from '../types/company.types';
import { TEXTS } from '../utils/constants';

interface ISearchResultsProps {
  text: string;
  data: { jobs: IJob[]; users: IUser[]; companies: ICompany[] };
}

export default function SearchResults({ text, data }: ISearchResultsProps) {
  // Check if there is any data.
  // If there isn't any data, return message to display nothing has been found.
  const isDataEmpty = Object.values(data).every((d) => d.length === 0);
  if (isDataEmpty) {
    return (
      <ErrorText>
        No data exists with the term <b>"{text}"</b> in our servers.
      </ErrorText>
    );
  }

  return (
    <ResultsContainer>
      {data.users.length > 0 && (
        <>
          <DataCategory>{TEXTS.USERS_HEADER}</DataCategory>
          <SearchResultsWrapper>
            {data.users.map((data) => (
              <UserWrapper key={data.id}>
                <Avatar src={data.avatar} />
                <div>
                  <DataHeader>{data.name}</DataHeader>
                  <small style={{ color: '#aaa' }}>{data.description}</small>
                </div>
              </UserWrapper>
            ))}
          </SearchResultsWrapper>
        </>
      )}
      {data.jobs.length > 0 && (
        <>
          <DataCategory>{TEXTS.JOBS_HEADER}</DataCategory>
          <SearchResultsWrapper>
            {data.jobs.map((data) => (
              <DataWrapper key={data.id}>
                <DataHeader>{data.name}</DataHeader>
                <small style={{ color: '#aaa' }}>{data.description}</small>
              </DataWrapper>
            ))}
          </SearchResultsWrapper>
        </>
      )}
      {data.companies.length > 0 && (
        <>
          <DataCategory>{TEXTS.COMPANIES_HEADER}</DataCategory>
          <SearchResultsWrapper>
            {data.companies.map((data) => (
              <DataWrapper key={data.id}>
                <DataHeader>{data.name}</DataHeader>
                <small style={{ color: '#aaa' }}>{data.description}</small>
              </DataWrapper>
            ))}
          </SearchResultsWrapper>
        </>
      )}
    </ResultsContainer>
  );
}

const ResultsContainer = styled.div`
  height: 100%;
`;

const DataHeader = styled.h4`
  font-size: 16px;
  font-weight: 500;
`;

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

export const ErrorText = styled.p`
  margin-top: 20px;
  padding: 10px 16px;
  background-color: rgba(255, 0, 0, 0.05);
  border-left: thick solid rgba(255, 0, 0, 0.2);
  font-size: 14px;
  line-height: 20px;
  word-break: break-all;
`;

const DataWrapper = styled.div`
  cursor: pointer;
`;
