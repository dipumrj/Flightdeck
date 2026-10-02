# Playwright TypeScript Framework

This project provides a reusable and maintainable Playwright TypeScript setup for simple site navigation and login using the Page Object Model.

## Structure

- tests: end-to-end specs
- pages: page object classes
- fixtures: shared test fixtures
- locators: centralized selectors
- config: environment settings
- test-data: sample credentials
- utils: helper functions
- reports: test outputs

## Run

1. Install dependencies: npm install
2. Install browsers: npx playwright install chromium
3. Set credentials in PowerShell: `$env:STANDARD_USERNAME = "your-username"` and `$env:STANDARD_PASSWORD = "your-password"`
4. Run tests: npm test
5. Open HTML report: npm run report
