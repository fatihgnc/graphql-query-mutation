import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { AiOutlineSearch } from 'react-icons/ai';

import { IJob } from '../../types/job.types';
import { IUser } from '../../types/user.types';
import { TEXTS } from '../../utils/constants';
import { ICompany } from '../../types/company.types';
import { getAllDataByText } from '../../graphql/queries';

import SearchResults, { ErrorText } from '../../components/SearchResults';
import {
  InputGroup,
  SearchInput,
  ClearTextIcon,
  SpinnerWrapper,
  QueriesContainer,
} from '../../layouts/main/hStyled';

const initialData = { companies: [], users: [], jobs: [] };
const initialState = {
  text: '',
  queryErrorText: '',
  data: initialData,
  isFetching: false,
  renderResults: false,
};

let queryTimeout: number;

export default function QueriesPage() {
  const [searchState, setSearchState] = useState<{
    text: string;
    queryErrorText: string;
    isFetching: boolean;
    renderResults: boolean;
    data: { jobs: IJob[]; users: IUser[]; companies: ICompany[] };
  }>(initialState);

  useEffect(() => {
    setSearchState({
      ...searchState,
      queryErrorText: '',
    });
    // perform query if text is longer than 2 chars on every key stroke.
    if (searchState.text.trim().length >= 2) {
      // clear timeout so spinner keeps spinning while typing
      if (queryTimeout) clearTimeout(queryTimeout);
      performQuery();
    } else {
      // remove everything from results
      setSearchState({
        ...searchState,
        data: initialData,
        isFetching: false,
        renderResults: false,
      });
    }

    async function performQuery() {
      // show loading spinner, hide results
      setSearchState((prevState) => ({
        ...prevState,
        isFetching: true,
        renderResults: false,
      }));
      try {
        const data = await getAllDataByText(searchState.text);
        setSearchState((prevState) => ({ ...prevState, data }));
      } catch (error: any) {
        setSearchState({
          ...searchState,
          queryErrorText: error.message,
        });
      } finally {
        // store timeout in a variable so it can be cleared while typing
        queryTimeout = setTimeout(() => {
          setSearchState((prevState) => ({
            ...prevState,
            isFetching: false,
            renderResults: true,
          }));
        }, 200);
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
    <QueriesContainer>
      <InputGroup>
        <AiOutlineSearch size={20} style={{ flexShrink: 0 }} />
        <SearchInput
          type='text'
          value={searchState.text}
          placeholder={TEXTS.INPUT_PLACEHOLDER}
          onChange={onChangeText}
        />
        {searchState.text.length > 0 && (
          <ClearTextIcon
            size={20}
            style={{ cursor: 'pointer' }}
            onClick={onClickCloseIcon}
          />
        )}
      </InputGroup>
      {searchState.text.length >= 2 && searchState.queryErrorText ? (
        <ErrorText>{searchState.queryErrorText}</ErrorText>
      ) : searchState.renderResults ? (
        <SearchResults data={searchState.data} text={searchState.text} />
      ) : (
        searchState.isFetching && (
          <SpinnerWrapper>
            <RotatingLines
              width='24'
              strokeWidth='5'
              strokeColor='grey'
              animationDuration='1'
            />
          </SpinnerWrapper>
        )
      )}
    </QueriesContainer>
  );
}
