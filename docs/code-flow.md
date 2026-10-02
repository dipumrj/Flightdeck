# Project Code Flow

This file visualizes the test -> fixture -> page object -> locator -> util -> config flow for the Login automation.

```mermaid
flowchart TD
  Tests["tests/login.spec.ts"] -->|imports| Fixture["fixtures/test.fixture.ts"]
  Fixture -->|creates| LoginPageObj["pages/login.page.ts\n(LoginPage extends BasePage)"]
  LoginPageObj -->|uses| BasePage["pages/base.page.ts"]
  LoginPageObj -->|reads/writes| Locators["locators/login.locators.ts"]
  LoginPageObj -->|calls| Helpers["utils/helpers.ts"]
  Tests -->|reads| Users["test-data/users.json"]
  Tests -->|may import| Environment["config/environment.ts"]
  PlaywrightConf["playwright.config.ts"] -.->|reads env vars (BASE_URL)| Environment
  PlaywrightConf -->|sets use.baseURL| PagesAndTests["Browser / Playwright run"]
  PagesAndTests["Browser / Playwright run"] --> Reports["reports/ (html, trace)"]

  Tests -->|asserts| Assertions["expect(...)"]
  Fixture -->|provides fixture| Tests
  LoginPageObj -->|navigation| BasePage
  BasePage -->|goto| Browser["Browser / Page"]
  Browser --> Reports

  style Tests fill:#f9f,stroke:#333,stroke-width:1px
  style Fixture fill:#ff9,stroke:#333
  style LoginPageObj fill:#9f9,stroke:#333
  style Locators fill:#9ff,stroke:#333
  style Helpers fill:#fc9,stroke:#333
  style Users fill:#cfc,stroke:#333
  style Reports fill:#eee,stroke:#333
  style Environment fill:#ffd,stroke:#333
  style PlaywrightConf fill:#dfd,stroke:#333
```

Brief flow description

- Test (`tests/login.spec.ts`) imports `test` from the custom fixture in `fixtures/test.fixture.ts` and `users` from `test-data/users.json`.
- Fixture (`fixtures/test.fixture.ts`) constructs `LoginPage` and injects it into tests as `loginPage`.
- `LoginPage` (`pages/login.page.ts`) extends `BasePage` and exposes methods: `openLoginPage()`, `login()`, `getErrorMessage()`.
- `LoginPage` uses `login.locators.ts` to locate elements and `utils/helpers.ts` for utility waits.
- `BasePage` (`pages/base.page.ts`) provides `open()` and common helpers that call Playwright's `page.goto()` and `waitForFunction()`.
- `config/environment.ts` centralizes `baseUrl` and credential defaults; `test-data/users.json` supplies test users.
 - `config/environment.ts` centralizes `baseUrl` and credential defaults; `test-data/users.json` supplies test users.
 - `playwright.config.ts` reads `process.env.BASE_URL` (or uses a default). Functionally the link between `config/environment.ts` and `playwright.config.ts` is via environment variables: `environment.ts` reads from `process.env` to build its `config`, and `playwright.config.ts` also reads `process.env.BASE_URL` to set Playwright's `use.baseURL`. Tests may import `config/environment.ts` directly, or you can wire `playwright.config.ts` to import `environment.ts` if you prefer a single source of truth.
- Tests call page methods, make assertions (`expect(...)`), and Playwright emits traces and HTML reports under `reports/`.

Open the diagram file: [Login/docs/code-flow.md](Login/docs/code-flow.md)
