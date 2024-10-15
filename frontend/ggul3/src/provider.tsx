import { NextUIProvider } from '@nextui-org/system';
import { QueryClientProvider } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from './main';

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={navigate}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </NextUIProvider>
    </QueryClientProvider>
  );
}
