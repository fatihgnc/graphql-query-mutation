import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Container, Link, NavbarWrapper, NavFirstLetter } from './hStyled';

export default function MainLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/queries');
    }
  }, []);

  return (
    <Container>
      <NavbarWrapper>
        <div>
          <Link to='queries'>
            <NavFirstLetter>Q</NavFirstLetter>
            ueries
          </Link>
          <Link to='mutations'>
            <NavFirstLetter>M</NavFirstLetter>
            utations
          </Link>
        </div>
      </NavbarWrapper>
      <Outlet />
    </Container>
  );
}
