import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { BottomBar } from './modules/common/components/Layouts/BottomBar';
import { Provider } from './provider';
import { SessionCheck } from './modules/common/components/SessionCheck';

const queryClient = new QueryClient();

function App() {
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
