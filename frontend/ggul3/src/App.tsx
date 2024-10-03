import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { BottomBar } from './modules/common/components/Layouts/BottomBar';
import { Provider } from './provider';
import { useSocket } from './modules/common/hooks/useSocket';

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
          <Outlet />
          <BottomBar />
        </div>
        <Toaster />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
