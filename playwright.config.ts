import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT ?? '8080';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results', detail: false }]
  ],
  use: {
    baseURL: process.env.BASE_URL ?? `http://localhost:${PORT}`,
    testIdAttribute: 'data-testid',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5_000,
    navigationTimeout: 15_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
  webServer: {
    command: `python3 -m http.server ${PORT} --directory app`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'chromium-flaky',
      grep: /@flaky/,
      retries: 2,
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
