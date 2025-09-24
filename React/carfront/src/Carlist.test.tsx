import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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

const wrapper = ({ children } : { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);

describe("CarList tests", () => {
    test("component renders", () => {
        // 테스트 케이스 코드
        render(<CarList />, { wrapper });
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    })
});