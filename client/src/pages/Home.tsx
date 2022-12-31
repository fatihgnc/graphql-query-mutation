import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Container } from './hStyled';
import { getAllDataByText } from '../graphql/queries';

let timeout: number;

export default function Home() {
  const [searchState, setSearchState] = useState<{
    text: string;
    data: any[];
  }>({ text: '', data: [] });
  // const [searchResultsAnimationRef] = useAutoAnimate<HTMLDivElement>({
  //   duration: 300,
  //   disrespectUserMotionPreference: true,
  // });

  useEffect(() => {
    if (searchState.text.trim().length >= 2) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        processSearchData();
      }, 200);
    } else {
      setSearchState({ ...searchState, data: [] });
    }

    async function processSearchData() {
      try {
        const { jobsByTitle, companiesByName, usersByFullname } =
          await getAllDataByText(searchState.text);
        const processedData = [
          ...jobsByTitle,
          ...companiesByName,
          ...usersByFullname,
        ].map((data) => ({
          ...data,
          name: data.title || data.name || data.fullname,
          description: data.description || data.job?.title || 'Unemployed',
        }));
        setSearchState({ ...searchState, data: processedData });
      } catch (error: any) {
        alert(error.message);
      }
    }
  }, [searchState.text]);

  // useEffect(() => {
  //   console.log(searchState.data);
  // }, [searchState.data]);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState({ ...searchState, text: event.target.value });
  };

  const onClickCloseIcon = () => {
    setSearchState({ ...searchState, text: '' });
  };

  return (
    <Container>
      <SearchInputWrapper>
        <InputGroup>
          <AiOutlineSearch size={20} />
          <SearchInput
            type='text'
            placeholder='Search user, job, company...'
            onChange={onChangeText}
          />
          {searchState.text.length > 0 && (
            <ClearTextIcon size={24} onClick={onClickCloseIcon} />
          )}
        </InputGroup>
        {!!searchState.data.length && (
          <SearchResultsWrapper>
            {searchState.data.map((data) => (
              <div key={data.id} style={{ cursor: 'pointer' }}>
                <div>{data.name}</div>
                <small style={{ color: '#aaa' }}>{data.description}</small>
              </div>
            ))}
          </SearchResultsWrapper>
        )}
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

const SearchResultsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
