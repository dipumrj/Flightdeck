import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { loginLocators } from '../locators/login.locators';



export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //Usage in Page Object:Functions that return Locator
  async login(username: string, password: string) {
  await loginLocators.usernameInput(this.page).fill(username);
  await loginLocators.passwordInput(this.page).fill(password);
  await loginLocators.loginButton(this.page).click();
  }

  //Usage of errorMessage in page object
  async getErrorMessage() {
   return await loginLocators.errorMessage(this.page).textContent();
  }

  async isLoginButtonVisible() {
    return loginLocators.errorMessage(this.page).isVisible();
  }
}


/* Example usage
const errorText = await loginPage.getErrorMessage();
expect(errorText).toContain('Username and password do not match');

*/
