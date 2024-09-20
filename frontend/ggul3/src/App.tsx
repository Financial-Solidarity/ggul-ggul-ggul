import { Outlet } from 'react-router-dom';

import { BottomBar } from './modules/common/components/BottomBar';
import { Provider } from './provider';

function App() {
  return (
    <Provider>
      <div className="w-full h-screen flex flex-col">
        <Outlet />
        <BottomBar />
      </div>
    </Provider>
  );
}

export default App;
