import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

import { Container, Link, NavbarWrapper, NavFirstLetter } from './hStyled';

export default function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/queries');
    }
  }, []);

  const onToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Container>
      <NavbarWrapper width={isSidebarCollapsed ? 5 : 10}>
        <MenuToggler onClick={onToggleSidebar}>
          {isSidebarCollapsed ? (
            <BsArrowRightCircleFill size={20} fill='#ccc' />
          ) : (
            <BsArrowLeftCircleFill size={20} fill='#ccc' />
          )}
        </MenuToggler>
        <div>
          <Link to='queries'>
            <NavFirstLetter>Q</NavFirstLetter>
            {!isSidebarCollapsed && 'ueries'}
          </Link>
          <Link to='mutations'>
            <NavFirstLetter>M</NavFirstLetter>
            {!isSidebarCollapsed && 'utations'}
          </Link>
        </div>
      </NavbarWrapper>
      <Outlet />
    </Container>
  );
}

const MenuToggler = styled.div`
  display: grid;
  place-items: center;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;
