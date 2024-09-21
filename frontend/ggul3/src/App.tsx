import { Outlet } from 'react-router-dom';

import { BottomBar } from './modules/common/components/Layouts/BottomBar';
import { Provider } from './provider';

function App() {
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
