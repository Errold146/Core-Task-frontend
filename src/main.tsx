import './index.css';
import Router from './router';
import { Toaster } from 'sonner';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router />
            <ReactQueryDevtools />
            <Toaster richColors position='top-right' />
        </QueryClientProvider>
	</StrictMode>,
)
