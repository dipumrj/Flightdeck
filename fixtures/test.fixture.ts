//test as base: imports Playwright’s base test object, renamed to base so we can extend it.
import { test as base, Page, APIRequestContext } from '@playwright/test'; 
import { LoginPage } from '../pages/login.page';
import { ClientAddPage } from '../pages/client-add.page';
//import { config } from '../config/environment';
/*
Defines the shape of your custom fixture context.
Any test using this fixture will know loginPage is a LoginPage.*/

/* base.extend<TestFixtures>(...) creates a new test object with your fixture types.
loginPage is the fixture name.
The fixture callback receives:
{ page }: Playwright’s built-in page fixture
use: a function to pass the created value into the test
Inside the callback:
new LoginPage(page) creates your page object
await use(loginPage) makes that instance available inside tests
This is the standard Playwright fixture pattern for async setup.*/

/*
This is the standard Playwright fixture pattern for async setup.
export { expect } from '@playwright/test';
Re-exports Playwright’s expect.

In your test setup, you're exporting expect from the fixture file to create a single entry point for all test utilities.

Without this re-export, your test files would need multiple imports:
// ❌ Without re-export (two separate imports)
import { test } from '../fixtures/test.fixture';
import { expect } from '@playwright/test';

The Solution
By re-exporting expect from your fixture file:
// ✅ With re-export (one unified import)

It's a design pattern that treats your fixture file as the central hub for test configuration, making your test suite more organized and maintainable.

import { test, expect } from '../fixtures/test.fixture';

So test files can import both from ../fixtures/test.fixture:
import { test, expect } from '../fixtures/test.fixture';
What this enables in tests
In login.spec.ts, this works:
test('...', async ({ loginPage }) => {
  await loginPage.openLoginPage();
});

loginPage is provided by your custom fixture
TypeScript knows it is a LoginPage
No need to annotate loginPage inside the test
you can explore how to add more fixtures (like authToken, apiClient, or baseUrl) in the same file.
*/


export type TestFixtures = {
  loginPage: LoginPage;
  clientAddPage: ClientAddPage;
//   apiRequest: APIRequestContext;
//  authApiRequest: APIRequestContext;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }: { page: Page }, use: (loginPage: LoginPage) => Promise<void>) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  clientAddPage: async ({ page }: { page: Page }, use: (clientAddPage: ClientAddPage) => Promise<void>) => {
    const clientAddPage = new ClientAddPage(page);
    await use(clientAddPage);
  },
  // Expose Playwright's built-in request context for raw API calls
  // apiRequest: async ({ playwright }, use: (r: APIRequestContext) => Promise<void>) => {
  //   const apiContext = await playwright.request.newContext({ ignoreHTTPSErrors: true });
  //   await use(apiContext);
  //   await apiContext.dispose();
  // },

  // Provide an authenticated API request context when possible.
  // It attempts to POST to /api/login with credentials from config and
  // attaches the returned token as a Bearer header for subsequent requests.
  // authApiRequest: async ({ playwright }, use: (r: APIRequestContext) => Promise<void>) => {
  //   let apiContext: APIRequestContext | undefined;
  //   const requestOptions = { ignoreHTTPSErrors: true };
  //   try {
  //     const unauthRequest = await playwright.request.newContext(requestOptions);
  //     const resp = await unauthRequest.post(`${config.baseUrl}/api/login`, {
  //       data: {
  //         username: config.users.standard.username,
  //         password: config.users.standard.password,
  //       },
  //     });

      // let token: string | undefined;
      // try {
      //   const body = await resp.json();
      //   token = body.token || body.accessToken;
      // } catch {
      //   // ignore JSON parse errors
      // }

  //     if (token) {
  //       apiContext = await playwright.request.newContext({
  //         ...requestOptions,
  //         baseURL: config.baseUrl,
  //         extraHTTPHeaders: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //     }
  //     await unauthRequest.dispose();
  //   } catch {
  //     // ignore and fallback to unauthenticated request
  //   }

  //   if (!apiContext) apiContext = await playwright.request.newContext(requestOptions);
  //   await use(apiContext);
  //   if (apiContext) await apiContext.dispose();
  // },
});

export { expect } from '@playwright/test';
