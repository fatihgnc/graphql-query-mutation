import { IoIosClose } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #222;

  & * {
    color: white;
  }
`;

export const NavbarWrapper = styled.div.attrs(
  (props: { width: number }) => props
)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width + 'vw'};
  height: 100vh;
  margin-bottom: 20px;
  padding-inline: 20px;
  row-gap: 20px;
  transition: width 250ms ease-in-out;
  flex-shrink: 0;
  background-color: #333;
`;

export const HeaderText = styled.h2`
  color: orange;
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

export const QueriesContainer = styled.div`
  padding: 16px 24px;
  margin: 30px 50px;
  min-height: 58px;
  max-height: 95%;
  align-self: flex-start;
  border: thin solid #444;
  border-radius: 6px;
  flex-grow: 1;
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

export const Link = styled(NavLink)`
  margin-bottom: 20px;
  display: block;
  text-decoration: none;
`;

export const NavFirstLetter = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 12px;
  border: thin solid orange;
  border-radius: 6px;
  color: orange;
  font-weight: 700;
`;
