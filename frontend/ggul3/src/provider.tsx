import { NextUIProvider } from '@nextui-org/system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  return (
    <NextUIProvider navigate={navigate}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextUIProvider>
  );
}
