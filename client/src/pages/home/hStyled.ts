import { IoIosClose } from 'react-icons/io';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 50px;
  background-color: #222;

  & * {
    color: white;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 20px;
`;

export const HeaderText = styled.h1`
  color: pink;
`;

export const SpinnerWrapper = styled.div`
  margin-top: 20px;
`;

export const ClearTextIcon = styled(IoIosClose)`
  flex-shrink: 0;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

export const SearchInputWrapper = styled.div`
  padding: 16px 24px;
  border: thin solid #444;
  border-radius: 6px;
  min-height: 58px;
  max-height: 95%;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(90, 90, 90);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  font-size: 18px;
  color: white;

  &::placeholder {
    color: #ccc;
  }
`;
