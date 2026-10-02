import { test, expect } from '../fixtures/test.fixture';
import users from '../test-data/users.json';
import {Helpers} from '../utils/helpers';

test.describe('Flightdeck Login Flow', () => {
//Newly Added
test.beforeEach('logs in successfully with valid credentials',async ({loginPage}) => {
    await loginPage.open();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(loginPage.page).toHaveURL(/dashboard/);
  });

  //Without using beforeEach hook, you can also write the test like this:

//   test('logs in successfully with valid credentials', async ({ loginPage }) => {
//     await loginPage.openLoginPage();
//     await loginPage.login(users.standardUser.username, users.standardUser.password);
//     await expect(loginPage.page).toHaveURL(/dashboard/);
//   });

  test('creates a new client through the requested workspace flow', async ({clientAddPage }) => {
    // await loginPage.openLoginPage();
    // await loginPage.login(users.standardUser.username, users.standardUser.password);
    // await expect(loginPage.page).toHaveURL(/dashboard/);
    //An object is passed to the createClientFromSidebarFlow method, containing the necessary client details to fill out the form and submit it.
    await clientAddPage.createClientFromSidebarFlow({
      profileName: 'Auto Profile Four' + Helpers.generateRandomNumber(1, 1000),
      profileDescription: 'This is a test client profile.',
      clientName: 'Content new',
      websiteURL: 'https://www.huggies.com.au',
      companyLogo: 'C:\\D-Drive\\EXTRA\\Media\\Image\\company.png',
      contactPerson: 'Dipesh',
      contactEmail: 'Dipesh@gmail.com',
      address: 'kathmandu',
      industryCategory: 'Default - Old Category',
     
    });
  });

  // test('shows error for invalid credentials', async ({ loginPage }) => {
  //   await loginPage.openLoginPage();
  //   await loginPage.login('invalid_user', 'wrong_password');
  //   const errorText = await loginPage.getErrorMessage();
  //   expect(errorText).toContain('invalid credentials');
  // });
});
/*
test.describe() is used to group related tests together in Playwright. or  just a container for related tests.
Inside test.describe(), you can also use:

test.beforeEach(...)
test.afterEach(...)

The syntax of test.describe is:
test.describe(name, callback)

Parts
test.describe → Playwright’s function for grouping tests
name → a string label for the group
callback → a function where you put the related tests

Common Pattern
test.describe('Feature Name', () => {
  test('Test case 1', async () => { ... });
  test('Test case 2', async () => { ... });
});


loginPage is passed in test('logs in successfully with valid credentials', async ({ loginPage }) =>{} because  test is using a custom fixture from login.spec.ts and test.fixture.ts.


await expect(loginPage.page).toHaveURL(/dashboard/);

is a Playwright assertion that checks the current browser URL.

Breakdown
loginPage.page
the underlying Playwright Page object inside your LoginPage page object
expect(...)
Playwright test assertion helper
.toHaveURL(/dashboard/)
checks that the current URL matches the regular expression /dashboard/

*/
/* hooks that let you run code before or after tests
Start
   │
   ▼
beforeAll()
   │
   ▼
beforeEach()
   │
   ▼
Test 1
   │
   ▼
afterEach()
   │
   ▼
beforeEach()
   │
   ▼
Test 2
   │
   ▼
afterEach()
   │
   ▼
afterAll()
   │
   ▼
End

*/