import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

import { BottomBar } from './modules/common/components/Layouts/BottomBar';
import { Provider } from './provider';
import { useSocket } from './modules/common/hooks/useSocket';
import { SessionCheck } from './modules/common/components/SessionCheck';

const queryClient = new QueryClient();

function App() {
  const { connect } = useSocket();

  useEffect(() => {
    connect();
  }, []);

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <div className="flex h-screen w-full flex-col">
          <SessionCheck />
          <Outlet />
          <BottomBar />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
