import { describe, test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CarList from './components/CarList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe("CarList tests", () => {
    test("component renders", () => {
        render(<CarList />, { wrapper });
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    test("Cars are fetched", async () => {
        render(<CarList />, { wrapper });

        // mock 응답이 들어올 때까지 기다림
        await waitFor(() => screen.findByText(/New Car/i));
        expect(screen.getByText(/Ford/i)).toBeInTheDocument();
    });
});
