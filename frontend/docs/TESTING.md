# AI Prompt Enhancer - Testing Documentation

## Overview

This document outlines the testing strategy, approach, and practices for the AI Prompt Enhancer frontend application. The testing framework is designed to ensure code quality, reliability, and maintainability of the application.

## Testing Approach

### Test Types

The application employs a comprehensive testing approach including:

1. **Unit Tests**: Testing individual components, hooks, and utility functions
2. **Integration Tests**: Testing component interactions and service layer integrations
3. **End-to-End Tests**: Testing complete user flows and application behavior
4. **Snapshot Tests**: Ensuring UI consistency and preventing unintended changes
5. **Mock Tests**: Isolating components from external dependencies

### Testing Tools

- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing React components
- **Playwright**: End-to-end testing framework
- **Istanbul**: Code coverage reporting
- **MSW (Mock Service Worker)**: API mocking

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── utils/
├── tests/
│   ├── __mocks__/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── e2e/
└── jest.config.js
```

## Testing Configuration

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.mock.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};
```

### Test Setup

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});
```

## Component Testing

### Testing React Components

When testing React components, follow these guidelines:

1. Test component rendering
2. Test prop handling
3. Test state management
4. Test event handling
5. Test accessibility
6. Test with mocked dependencies

### Example Component Test

```typescript jsx
// src/components/PromptEnhancer/PromptEnhancer.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import PromptEnhancer from './PromptEnhancer';

describe('PromptEnhancer', () => {
  test('renders the editor and buttons', () => {
    render(<PromptEnhancer />);
    
    expect(screen.getByTestId('prompt-editor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enhance' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  test('handles text input change', () => {
    render(<PromptEnhancer />);
    
    const editor = screen.getByTestId('prompt-editor');
    fireEvent.change(editor, { target: { value: 'Test prompt' } });
    
    expect(editor).toHaveValue('Test prompt');
  });
});
```

## Hook Testing

### Testing Custom Hooks

```typescript
// src/hooks/usePromptEnhancer.test.ts
import { renderHook, act } from '@testing-library/react';
import { usePromptEnhancer } from './usePromptEnhancer';

describe('usePromptEnhancer', () => {
  test('should enhance prompt and return result', async () => {
    const { result } = renderHook(() => usePromptEnhancer());
    
    await act(async () => {
      const response = await result.current.enhancePrompt('Test prompt');
      expect(response).toBeDefined();
    });
  });
});
```

## Service Testing

### Testing API Services

```typescript
// src/services/PromptService.test.ts
import { PromptService } from './PromptService';
import { mockAxios } from '../test/__mocks__/axios';

describe('PromptService', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  test('should enhance prompt successfully', async () => {
    const mockResponse = {
      enhancedPrompt: 'Enhanced test prompt',
      processingTime: 100,
      tokensUsed: 20,
      originalPrompt: 'Test prompt',
      timestamp: new Date().toISOString()
    };

    mockAxios.onPost('/enhance').reply(200, mockResponse);

    const result = await PromptService.enhancePrompt({
      text: 'Test prompt',
      model: 'gpt-4',
      provider: 'openai'
    });

    expect(result).toEqual(mockResponse);
  });
});
```

## End-to-End Testing

### Playwright Setup

```typescript
// tests/e2e/example.spec.ts
import { test, expect } from '@playwright/test';

test('should enhance prompt successfully', async ({ page }) => {
  await page.goto('/');

  // Fill prompt
  await page.fill('[data-testid="prompt-editor"]', 'Test prompt');

  // Click enhance button
  await page.click('[data-testid="enhance-button"]');

  // Verify enhanced prompt
  await expect(page.locator('[data-testid="enhanced-prompt"]')).toBeVisible();
});
```

## Mocking Dependencies

### Mocking API Calls

```typescript
// src/test/__mocks__/axios.ts
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

export { mock as mockAxios };
```

### Mocking Services

```typescript
// src/test/__mocks__/PromptService.ts
export const mockPromptService = {
  enhancePrompt: vi.fn(),
  getModels: vi.fn(),
  getProviders: vi.fn(),
};
```

## Test Coverage

### Coverage Requirements

- **Components**: 90%+ line coverage
- **Hooks**: 90%+ line coverage  
- **Services**: 85%+ line coverage
- **Utilities**: 95%+ line coverage

### Coverage Reporting

Run coverage reports with:
```bash
npm run test:coverage
```

## Continuous Integration

### Test Automation

Tests are automatically run in CI pipeline:
1. Unit tests run on every commit
2. Integration tests run on pull requests
3. End-to-end tests run on feature branches
4. Coverage reports are generated and published

### Test Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

## Best Practices

### Writing Effective Tests

1. **Test one thing at a time**
2. **Use descriptive test names**
3. **Mock external dependencies**
4. **Test edge cases and error conditions**
5. **Use proper test isolation**
6. **Keep tests fast and reliable**

### Test Organization

1. **Group related tests in describe blocks**
2. **Use beforeEach/afterEach for setup/teardown**
3. **Organize tests by component or feature**
4. **Use test fixtures for complex data**
5. **Document test expectations clearly**

## Performance Testing

### Testing Large Lists

For components that handle large datasets:
- Test with small datasets first
- Test with large datasets to ensure performance
- Implement virtualization for better performance
- Test memory usage patterns

### Loading State Testing

Test components under various loading conditions:
- Initial loading states
- Network request delays
- Error states
- Empty states
- Success states

## Accessibility Testing

### Testing Accessibility

Include accessibility checks in tests:
```typescript jsx
import { render } from '@testing-library/react';
import { axe } from 'axe-core';

test('should be accessible', async () => {
  const { container } = render(<PromptEnhancer />);
  const results = await axe.run(container);
  expect(results.violations).toHaveLength(0);
});
```

## Debugging Tests

### Common Debugging Techniques

1. **Use console.log in tests** for debugging
2. **Run tests in watch mode** for rapid feedback
3. **Use test coverage reports** to identify untested code
4. **Check test environment** for configuration issues
5. **Use browser dev tools** for end-to-end debugging

### Test Debugging Commands

```bash
# Run specific test file
npm run test src/components/PromptEnhancer.test.tsx

# Run tests with verbose output
npm run test -- --verbose

# Run tests with coverage for specific file
npm run test:coverage -- src/components/PromptEnhancer.test.tsx
```

## End-to-End Testing with Playwright

### Playwright Configuration

The application uses Playwright for comprehensive end-to-end testing:

- Tests run in real browser environments
- Supports multiple browser targets
- Provides robust element locators
- Handles complex user interactions
- Integrates with CI pipelines
- Generates test reports

### E2E Test Structure

```
tests/e2e/
├── dashboard/
│   ├── navigation.spec.ts
│   └── layout.spec.ts
├── prompt/
│   ├── enhancement.spec.ts
│   └── history.spec.ts
└── settings/
    └── theme.spec.ts
```

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests in UI mode for debugging
npm run test:e2e:ui

# Run specific E2E test file
npx playwright test tests/e2e/prompt/enhancement.spec.ts
```

### E2E Testing Best Practices

1. **Use data-testid attributes** for reliable selectors
2. **Write tests that mirror user workflows**
3. **Handle async operations properly**
4. **Use page objects for reusable components**
5. **Implement proper test fixtures**
6. **Ensure tests are independent and idempotent**
