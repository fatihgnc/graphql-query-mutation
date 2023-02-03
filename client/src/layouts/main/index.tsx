import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { Container, Link, NavbarWrapper, NavFirstLetter } from './iStyled';

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
            <IoIosArrowForward size={20} fill='#ccc' />
          ) : (
            <IoIosArrowBack size={20} fill='#ccc' />
          )}
        </MenuToggler>
        <div>
          <Link to='queries'>
            <NavFirstLetter>Q</NavFirstLetter>
            {!isSidebarCollapsed && (
              <span
                style={{
                  marginLeft: '5px',
                  color: '#fff',
                }}
              >
                ueries
              </span>
            )}
          </Link>
          <Link to='mutations'>
            <NavFirstLetter>M</NavFirstLetter>
            {!isSidebarCollapsed && (
              <span
                style={{
                  marginLeft: '5px',
                  color: '#fff',
                }}
              >
                utations
              </span>
            )}
          </Link>
        </div>
      </NavbarWrapper>
      <Outlet />
    </Container>
  );
}

const MenuToggler = styled.div`
  z-index: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -25px;
  display: grid;
  place-items: center;
  padding: 5px;
  cursor: pointer;
  background-color: #333;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  transition: all 300ms;

  &:hover {
    transform: translateY(-50%) translateX(10%);
  }
`;
