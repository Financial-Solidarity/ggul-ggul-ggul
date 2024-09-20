import { Route, Routes } from 'react-router-dom';

import Temp from './modules/domain1/pages/Temp';

function App() {
  return (
    <Routes>
      <Route element={<Temp />} path="/" />
    </Routes>
  );
}

export default App;
