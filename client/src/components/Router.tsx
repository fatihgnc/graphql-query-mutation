import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='job/:jobId' element={<div>job</div>} />
          <Route path='user/:userId' element={<div>user</div>} />
          <Route path='company/:companyId' element={<div>company</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
