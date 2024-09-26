import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { BottomBar } from './modules/common/components/Layouts/BottomBar';
import { Provider } from './provider';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <div className="flex h-screen w-full flex-col">
          <Outlet />
          <BottomBar />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
