/*
-const is used to declare a variable whose value cannot be reassigned.
-export makes variables, functions, classes, or objects available to other files.
-|| (Logical OR Operator)
-if it is undefined, null, or empty, use the default value.
-nested object for username and password used. 
-it's Centralized Configuration
*/

/*
How to provide it
PowerShell (current session):

$env:BASE_URL = "https://qa.example.com"
npx playwright test */

import users from '../test-data/users.json';

export const config = { 
  baseUrl: process.env.BASE_URL || 'https://dev-prelive-flightdeck.resolutiondigital.com.au',
  users: {
    standard: {
      username: process.env.STANDARD_USERNAME || 'standard_user',
      password: process.env.STANDARD_PASSWORD || 'secret_sauce',
    },
  },
};

/*
import { test } from '@playwright/test';
import { config } from '../utils/config';

test('Login Test', async ({ page }) => {
  await page.goto(config.baseUrl);

  await page.fill(
    '#username',
    config.users.standard.username
  );

  await page.fill(
    '#password',
    config.users.standard.password
  );
}); */

/* Support Mutliple users
export const config = {
  baseUrl: process.env.BASE_URL,

  users: {
    admin: {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    },

    standard: {
      username: process.env.STANDARD_USERNAME,
      password: process.env.STANDARD_PASSWORD,
    },

    readonly: {
      username: process.env.READONLY_USERNAME,
      password: process.env.READONLY_PASSWORD,
    },
  },
}; */


/*  Final Object (if no environment variables exist)

{
  baseUrl: "https://dev-prelive-flightdeck.resolutiondigital.com.au",
  users: {
    standard: {
      username: "standard_user",
      password: "secret_sauce"
    }
  }
}


*/

/*  Option 2: Set environment variables from the terminal

PowerShell
$env:BASE_URL="https://qa.example.com"
$env:STANDARD_USERNAME="qauser"
$env:STANDARD_PASSWORD="Password123"

npx playwright test

CMD
set BASE_URL=https://qa.example.com
set STANDARD_USERNAME=qauser
set STANDARD_PASSWORD=Password123
npx playwright test

*/

/*

-A .env file (Environment Variables file) is a simple text file used to store configuration values and sensitive information outside of your source code.
-you store them in a .env file:
-process.env is a Node.js object containing environment variables.
Instead of hardcoding values like:
const username = 'admin';
const password = 'Password123';
const baseUrl = 'https://qa.example.com';

-you store them in a .env file:
BASE_URL=https://qa.example.com
USERNAME=admin
PASSWORD=Password123

-Then your application reads these values using process.env.
- .env This prevents credentials from being committed to Git.

.env
   ↓
process.env
   ↓
config.ts
   ↓
playwright.config.ts and tests

After installing dotenv
.env file
     ↓
dotenv.config()
     ↓
process.env
     ↓
config.ts
     ↓
playwright.config.ts / tests


*/