import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { BottomBar } from './modules/common/components/Layouts/BottomBar';
import { Provider } from './provider';
import { useSocket } from './modules/common/hooks/useSocket';
import { useUserStore } from './modules/common/store/userStore';

function App() {
  const { connect } = useSocket();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    console.log(
      'socket endpoint : ' + import.meta.env.VITE_SOCKET_CONNECT_ENDPOINT,
    );
    if (!user) return;
    connect();
  }, [user]);

  return (
    <Provider>
      <div className="flex h-screen w-full flex-col">
        <Outlet />
        <BottomBar />
      </div>
      <Toaster />
    </Provider>
  );
}

export default App;
