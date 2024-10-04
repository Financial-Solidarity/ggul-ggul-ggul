import { NextUIProvider } from '@nextui-org/system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  return (
    <NextUIProvider navigate={navigate}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </NextUIProvider>
  );
}
