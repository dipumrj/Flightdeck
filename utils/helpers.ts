
/* Updated one */
/*  Playwright's networkidle means no network connections for ~500ms. */
/*  1 case in test
    await page.goto('https://example.com');
    await Helpers.waitForPageLoad(page); // waits until network is idle
    2 case
    await Helpers.waitForPageLoad(this.page); // wait for background requests to finish
      // then assert UI/state
      await expect(this.page.locator('#dashboard')).toBeVisible();
  

  */


import { Page } from '@playwright/test';

export class Helpers {
  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
  }

  static generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } 
  
}


/* old

export class Helpers {
  static async waitForPageLoad(page: any): Promise<void> {
    await page.waitForLoadState('networkidle');
  }
}*/
