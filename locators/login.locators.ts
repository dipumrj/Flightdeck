
import { Page } from '@playwright/test';

//Functions that return Locator
/*usernameInput is a function property inside loginLocators.
It accepts one argument: page, which is a Playwright Page object.
It returns a Locator found on that page.
Specifically:*/
/*The .first() method in Playwright returns a new locator that points to the first matching element from the original locator. */

export const loginLocators = {

  usernameInput: (page: Page) =>page.getByRole('textbox', {  name: 'Enter Username'}),
  passwordInput: (page: Page) => page.getByRole('textbox', {  name: 'Enter Password'}),
  loginButton: (page: Page) => page.getByRole('button', {  name: 'Login'}),
  //errorMessage: (page: Page) => page.locator('[class*="error"]'),
  errorMessage: (page: Page) =>page.locator('li:has-text("invalid credentials")')
  /*Yet to change the locator of errorMessage*/  
  };

export const clientAddLocators = {
  
//page.getByRole('textbox', { name: 'Profile Name *' })
  profileDescriptionInput: (page: Page) => page.getByRole('textbox', { name: 'Profile Description *' }).first(),
  clientNameInput: (page: Page) => page.getByRole('textbox', { name: 'Client Name *' }).first(),
  websiteURLInput: (page: Page) => page.getByRole('textbox', { name: 'Website URL *' }).first(),
  logoUploadInput: (page: Page) => page.locator('input[type="file"]').first(),
  contactPersonInput: (page: Page) => page.getByRole('textbox', { name: 'Contact Person' }).first(),
  contactEmailInput: (page: Page) => page.getByRole('textbox', { name: 'Contact Email(s) *' }).first(),
  addressInput: (page: Page) => page.getByRole('textbox', { name: 'Address' }).first(),
  industryCategoryInput: (page: Page) => page.locator('input[placeholder="Select Industry Category"], input[aria-label*="Industry Category" i], input[role="combobox"]').first(),
  submitButton: (page: Page) => page.getByRole('button', { name: /continue|submit|save/i }).first(),
  successMessage: (page: Page) => page.locator('text=/success|created|saved/i').first(),
};


  /* 

Class-based (Even Better for Scalability)
Better for larger projects with multiple page objects:

export class LoginLocators {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get usernameInput() {
    return this.page.getByRole('textbox', { name: 'Enter Username' });
  }

  get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Enter Password' });
  }

  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get errorMessage() {
    return this.page.locator('[class*="error"]');

    
  }
}

Usage:

export class LoginPage extends BasePage {
  private locators: LoginLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new LoginLocators(page);
  }

  async login(username: string, password: string) {
    await this.locators.usernameInput.fill(username);
    await this.locators.passwordInput.fill(password);
    await this.locators.loginButton.click();
  }
}


*/