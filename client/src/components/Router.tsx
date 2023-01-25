import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from '../layouts/main';
import QueriesPage from '../pages/queries';
import MutationsPage from '../pages/mutations';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='queries' element={<QueriesPage />} />
          <Route path='mutations' element={<MutationsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
