import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { BottomBar } from './modules/common/components/Layouts/BottomBar';
import { Provider } from './provider';
import { useSocket } from './modules/common/hooks/useSocket';
import { useUserStore } from './modules/common/store/userStore';
import { JustifyModal } from './modules/challenge/components/chat/JustifyModal';
import { messaging } from './config/firebaseConfig';
import { PathNames } from './router';
function App() {
  const { connect } = useSocket();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    connect();
  }, [user]);

  useEffect(() => {
    // 포그라운드 메시지 수신
    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      if (payload.data.type === 'CHALLENGE_READY') {
        navigate(PathNames.CHALLENGE.CHATTING_ROOMS.path, { replace: true });
      }
      // 여기서 알림을 표시하거나 처리합니다.
      alert(`New message: ${payload.notification?.title}`);
    });
  }, []);

  return (
    <Provider>
      <div className="flex h-screen w-full flex-col">
        <Outlet />
        <BottomBar />
      </div>
      <Toaster />
      <JustifyModal />
    </Provider>
  );
}

export default App;
