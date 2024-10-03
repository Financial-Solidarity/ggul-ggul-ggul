import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { BottomBar } from './modules/common/components/Layouts/BottomBar';
import { Provider } from './provider';
import { useSocket } from './modules/common/hooks/useSocket';

function App() {
  const { connect } = useSocket();

  useEffect(() => {
    connect();
  }, []);

  return (
    <Provider>
      <div className="flex h-screen w-full flex-col">
        <Outlet />
        <BottomBar />
      </div>
    </Provider>
  );
}

export default App;
