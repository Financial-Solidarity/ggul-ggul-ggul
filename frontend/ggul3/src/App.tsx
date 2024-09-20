import { Route, Routes } from 'react-router-dom';

import Temp from './modules/domain1/pages/Temp';
import LoginPage from './modules/user/pages/LoginPage';
import FindPasswordPage from './modules/user/pages/FindPasswordPage';

function App() {
  return (
    <Routes>
      <Route element={<Temp />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<FindPasswordPage />} path="/find-password" />
    </Routes>
  );
}

export default App;
