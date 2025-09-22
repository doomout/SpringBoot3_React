import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/vitest';

describe("App tests", () => {
    test("component renders", () => {
        // 테스트 케이스 코드
        render(<App />);
        //expect(screen.getByText(/Car Shop/i)).toBeDefined();
        expect(screen.getByText(/Car Shop/i)).toBeInTheDocument();
    })
});