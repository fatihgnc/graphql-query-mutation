import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';

import { getAllDataByText } from '../graphql/queries';

import SearchResults from '../components/SearchResults';
import { Container } from './hStyled';

const initialData = { companies: [], users: [], jobs: [] };
const initialState = { text: '', data: initialData, isFetching: false };

export default function Home() {
  const [searchState, setSearchState] = useState<{
    text: string;
    data: { jobs: any[]; users: any[]; companies: any[] };
    isFetching: boolean;
  }>(initialState);

  useEffect(() => {
    if (searchState.text.trim().length >= 2) {
      performQuery();
    } else {
      setSearchState({ ...searchState, data: initialData, isFetching: false });
    }

    async function performQuery() {
      try {
        setSearchState((prevState) => ({ ...prevState, isFetching: true }));
        const data = await getAllDataByText(searchState.text);
        setSearchState((prevState) => ({ ...prevState, data }));
      } catch (error: any) {
        alert(error.message);
      } finally {
        setSearchState((prevState) => ({ ...prevState, isFetching: false }));
      }
    }
  }, [searchState.text]);

  const onClickCloseIcon = () => {
    setSearchState(initialState);
  };

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState((prevState) => ({ ...prevState, text: event.target.value }));
  };

  return (
    <Container>
      <SearchInputWrapper>
        <InputGroup>
          <AiOutlineSearch size={20} style={{ flexShrink: 0 }} />
          <SearchInput
            type='text'
            value={searchState.text}
            placeholder='Search user, job, company...'
            onChange={onChangeText}
          />
          {searchState.text.length > 0 && (
            <ClearTextIcon
              style={{ cursor: 'pointer' }}
              size={20}
              onClick={onClickCloseIcon}
            />
          )}
        </InputGroup>
        {searchState.text.length >= 2 &&
          (searchState.isFetching ? (
            <LoadingText>Loading...</LoadingText>
          ) : (
            <SearchResults data={searchState.data} text={searchState.text} />
          ))}
      </SearchInputWrapper>
      <Outlet />
    </Container>
  );
}

const ClearTextIcon = styled(IoIosClose)`
  flex-shrink: 0;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const SearchInputWrapper = styled.div`
  padding: 16px 24px;
  border: thin solid #444;
  border-radius: 12px;
  min-height: 58px;
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: 18px;
  color: white;

  &::placeholder {
    color: #ccc;
  }
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 14px;
`;
