import { vi } from 'vitest'

// css/scss 파일 전부 무시
vi.mock('*.css', () => ({}));
vi.mock('*.scss', () => ({}));
vi.mock('@mui/x-data-grid/esm/index.css', () => ({}));
