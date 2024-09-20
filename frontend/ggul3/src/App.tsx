import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import Temp from './modules/domain1/pages/Temp';
import { mockRequest } from './mocks/wrapper';

function App() {
  const tempRequest = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();

      return data; // 데이터 반환
    } catch (error) {
      console.error('Error fetching mock data:', error);
    }
  };

  useEffect(() => {
    mockRequest(tempRequest);
  }, []);

  return (
    <Routes>
      <Route element={<Temp />} path="/" />
    </Routes>
  );
}

export default App;
