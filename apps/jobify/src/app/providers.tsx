'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider, Toaster } from '@tutorial/shared-lib';
import { ReactNode, useState } from 'react';

function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(()=>{
    return new QueryClient({
      defaultOptions: {
        queries:{
          staleTime: 60 * 1000 * 5
        }
      }
    })
  })
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      ><Toaster />
      <QueryClientProvider client={queryClient} >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
        
      </ThemeProvider>
    </>
  );
}

export default Providers;
