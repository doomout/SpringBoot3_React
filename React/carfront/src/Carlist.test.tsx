import { describe, test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CarList from './components/CarList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

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

        await waitFor(() => screen.findByText(/New Car/i));
        expect(screen.getByText(/Ford/i)).toBeInTheDocument();
    });

    test("Open new car modal", async () => {
        render(<CarList />, { wrapper });

        await waitFor(() => screen.findByText(/New Car/i));
        await userEvent.click(screen.getByText(/New Car/i));
        expect(screen.getByText(/Save/i)).toBeInTheDocument();
    });
});
