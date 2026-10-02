/* -Page is a Playwright class that represents a browser tab.
   -In the Page Object Model (POM), a BasePage contains common methods that every page can use.
    Examples:

    Open URL
    Wait for page title
    Click methods
    Wait for loaders
    Take screenshots 

   -Opens baseurl/ ie https://dev-prelive-flightdeck.resolutiondigital.com.au/
   -The method accepts either: sring or RegExp as a parameter.
    String
    await page.waitForPageTitle('Dashboard');
    or
    Regular Expression
    await page.waitForPageTitle(/Dashboard/);
   -This repeatedly executes JavaScript inside the browser until it returns true ie This method waits until the browser page title contains a certain value.
*/


/*
Playwright resolves relative URLs passed to page.goto() against the configured baseURL.
In your repo playwright.config.ts sets it:
use: { baseURL: process.env.BASE_URL || 'https://dev-prelive-flightdeck.resolutiondigital.com.au' }
Effect: await this.page.goto('/dashboard') navigates to https://dev-prelive-flightdeck.resolutiondigital.com.au/dashboard when use.baseURL is set to that host. If you pass an absolute URL (https://...), that is used as-is.


when baseURL comes from:
process.env.BASE_URL (env var) — you can set this in shell, CI, or via a .env + dotenv.
Or the hardcoded fallback in playwright.config.ts.
config/environment.ts also reads process.env.BASE_URL but doesn’t automatically inject it into Playwright unless you wire it (see alternatives below).*/


/* this.page.waitForFunction(...) tells Playwright to keep checking a browser-side condition until it becomes true.
The function passed in is:
(value: string) => document.title.includes(value)
It checks whether the current page title contains the string passed in as value.
The second argument, expectedTitle, is the value being passed into that function.
In simple terms:

If the page title is still not matching yet, Playwright waits. */


import { Page } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) {}

  async open(path = '/') {
    await this.page.goto(path);
  }

  async waitForPageTitle(title: RegExp | string) {
    const expectedTitle: string = title.toString();
    await this.page.waitForFunction((value: string) => document.title.includes(value), expectedTitle);
    //Best alternative await expect(this.page).toHaveTitle(/Dashboard/);
  }
}

/* Flow
new BasePage(page)
        ↓
constructor(public page: Page)
        ↓
this.page = page
        ↓
open('/login')
        ↓
page.goto('/login')
        ↓
waitForPageTitle('Dashboard')
        ↓
waitForFunction()
        ↓
document.title.includes('Dashboard') */


/* 
await loginPage.open('/dashboard')
            ↓
path = '/dashboard'
            ↓
this.page.goto('/dashboard')
            ↓
Browser opens:
https://dev-prelive-flightdeck.resolutiondigital.com.au/dashboard
            ↓
Method finishes

*/