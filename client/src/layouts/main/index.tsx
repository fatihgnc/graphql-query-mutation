import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { TEXTS } from '../../utils/constants';

import { Container, HeaderText, HeaderWrapper } from './hStyled';

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
      <HeaderWrapper>
        <img src='https://graphql.org/img/logo.svg' width={40} />
        <HeaderText>
          {pathname.includes('mutations')
            ? TEXTS.MUTATIONS_HEADER
            : TEXTS.QUERIES_HEADER}
        </HeaderText>
      </HeaderWrapper>
      <Outlet />
    </Container>
  );
}
