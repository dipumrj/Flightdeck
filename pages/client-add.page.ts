/*
An inline TypeScript object type is a way to define the structure (shape) of an object directly in a function parameter, variable, or property instead of creating a separate interface or type.

Example:
async createClientFromSidebarFlow(clientData: {
  profileDescription: string;
  clientName: string;
  websiteURL: string;
  contactPerson: string;
  contactEmail: string;
  address: string;
  companyLogo?: string;
  industryCategory: string;
}) {
  // Function body
}


*/

import { Page,expect } from '@playwright/test';
import { BasePage } from './base.page';
import { clientAddLocators } from '../locators/login.locators';

export class ClientAddPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

// export class ClientAddPage extends BasePage {
//   page: Page;
//   constructor(page: Page) {
//     //super(page);
//     this.page = page;
//   }

 private async addProfileName(profileName: string) {
  await this.page.getByRole('textbox', { name: 'Profile Name *' }).click();
  await this.page.getByRole('textbox', { name: 'Search' }).fill(profileName);
  await this.page.getByRole('button', { name: `Add ${profileName}` }).click();
 }


  private async clickSidebarClientOption() {
    //await this.page.waitForTimeout(5000);
    const clientOption = this.page.locator('div.flex.items-center.p-6.cursor-pointer.rounded-md.relative.transition-all.duration-300.hover\\:bg-white.hover\\:shadow');
    await expect(clientOption).toBeVisible({  timeout: 5000});
    await clientOption.first().click();
  }

  private async searchClientById(searchText: string) {
    const searchBox = this.page.locator('input[type="text"], input[placeholder*="client" i], input[placeholder*="search" i]').first();
    await searchBox.click();
    await this.page.waitForTimeout(2000);
    await searchBox.fill(searchText);
   // await this.page.waitForTimeout(5000);
  }

  private async selectSearchedClient() {
   // await this.page.waitForTimeout(2000);
    const searchBox = this.page.locator('div.cursor-default.w-full');
    //page.locator("//div[@class='cursor-default w-full']")
    //this.page.locator('[id="3203"]').getByText('Xbox Series X and S').first();
    await searchBox.click();
    //await this.page.waitForTimeout(5000);
  }

  private async openAddClientModal() {
    await this.page.goto('/profile/client-add');
    
    //const addClientButton = this.page.locator('.transition-all.duration-300.ease').first();
    //await addClientButton.click();
    await this.page.waitForTimeout(3000);
  }

  private async selectIndustryCategory(categoryName: string) {
    const industryCategoryInput = clientAddLocators.industryCategoryInput(this.page);
    await industryCategoryInput.click();

    const searchInput = this.page.locator('input[placeholder*="search" i], input[aria-label*="search" i]').first();
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.fill(categoryName);

    const categoryOption = this.page.getByText(categoryName, { exact: true }).first();
    await categoryOption.click();
  }

  /**
   * Navigate to the client-add page
   * ALTERNATIVE Solution   
   */
  // async navigateToClientAddPage() {
  //   await this.page.goto('/profile/client-add');
  // }

  /**
   * Fill all client details on the form
   * @param clientData - Object containing client details
   */

  /*Function fillClientDetails is using inline object clientData passed in function body*/
  /*The ? in TypeScript means the property is optional.
  companyLogo?: string; Means companyLogo may or may not be present in the object. If it is present, it must be a string.
  
  */
  async fillClientDetails(clientData: {
    profileName: string;
    profileDescription: string;
    clientName: string;
    websiteURL: string;
    companyLogo?: string;
    contactPerson: string;
    contactEmail: string;
    address: string;
    industryCategory: string;
    
  }) {

    // Fill Profile Name
    await this.addProfileName(clientData.profileName);

    // Fill Profile Description
    await clientAddLocators.profileDescriptionInput(this.page).fill(clientData.profileDescription);

    // Fill Client Name
    await clientAddLocators.clientNameInput(this.page).fill(clientData.clientName);

    // Fill Website URL
    await clientAddLocators.websiteURLInput(this.page).fill(clientData.websiteURL);

    // Upload company logo if provided
    if (clientData.companyLogo) {
      await clientAddLocators.logoUploadInput(this.page).setInputFiles(clientData.companyLogo);
    }

    // Fill Contact Person
    await clientAddLocators.contactPersonInput(this.page).fill(clientData.contactPerson);

    // Fill Contact Email
    await clientAddLocators.contactEmailInput(this.page).fill(clientData.contactEmail);

    // Fill Address
    await clientAddLocators.addressInput(this.page).fill(clientData.address);

    // Select Industry Category from the dropdown
    await this.selectIndustryCategory(clientData.industryCategory);
  }

  /**
   * Submit the client form
   */
  async submitClientForm() {
    await clientAddLocators.submitButton(this.page).click();
  }


async saveUserGroup() {
  await this.page.locator('.flex > .relative.c-checkbox > .label > .checkbox').first().click();
  await this.page.locator('.modal-content > div:nth-child(2) > .relative.c-checkbox > .label > .checkbox').click();
  await this.page.getByRole('button', { name: 'Save' }).click();
}

async saveRankingDetails() {
  await this.page.getByRole('textbox', { name: 'Search Engine *' }).click();
  await this.page.getByRole('textbox', { name: 'Search', exact: true }).fill('google:Aus');
  await this.page.getByText('Google:Australia').click();
  await this.page.locator('div:nth-child(2) > .mb-\\[0\\.5rem\\] > .switcher > .min-w-\\[48px\\]').click();
  await this.page.locator('div:nth-child(3) > .mb-\\[0\\.5rem\\] > .switcher > .min-w-\\[48px\\]').click();
  await this.page.getByRole('button', { name: 'Save' }).click();
  const continueButton = this.page.getByRole('button', { name: 'Continue' })
  await expect(continueButton).toBeVisible({  timeout: 5000});
  continueButton.click();
  
}

async gotoKeywordManager() {
  await this.page.getByRole('button', { name: 'Go to Keyword Manager' }).click();
}




  /**
   * Check if success message is visible
   */
  async isSuccessMessageVisible(): Promise<boolean> {
    return await clientAddLocators.successMessage(this.page).isVisible();
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string | null> {
    return await clientAddLocators.successMessage(this.page).textContent();
  }

  /**
   * Complete the entire client add flow: navigate, fill, and submit
   * ALTERNATIVE SOLUTION
   */
  // async completeClientAddFlow(clientData: {
  //   profileDescription: string;
  //   clientName: string;
  //   websiteURL: string;
  //   companyLogo?: string;
  //   contactPerson: string;
  //   contactEmail: string;
  //   address: string;
  //   industryCategory: string;
  // }) {
  //   await this.navigateToClientAddPage();
  //   await this.fillClientDetails(clientData);
  //   await this.submitClientForm();
  // }
//Function createClientFromSidebarFlow is using inline object clientData passed in function body
  async createClientFromSidebarFlow(clientData: {
    profileName: string;
    profileDescription: string;
    clientName: string;
    websiteURL: string;
    contactPerson: string;
    contactEmail: string;
    address: string;
    companyLogo?: string;
    industryCategory: string;
  }) {
   // await this.addProfileName(clientData.profileName);
    await this.page.waitForTimeout(5000);
    await this.clickSidebarClientOption();
    await this.searchClientById('3203');
    await this.selectSearchedClient();
    await this.page.waitForTimeout(6000);
   // await this.clickSidebarClientOption();
    //await this.page.waitForTimeout(8000);
    await this.openAddClientModal();
    await this.fillClientDetails(clientData);
    await this.submitClientForm();
    await this.saveUserGroup();
    await this.page.waitForTimeout(3000);
    await this.saveRankingDetails();
    await this.gotoKeywordManager();
   



  }
}
