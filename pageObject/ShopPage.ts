import {test,expect,Locator,Page} from '@playwright/test';

export class ShopPage{

    page: Page;
    headerShopName: Locator;

    //create a constructor
    constructor(page: Page)
    {
        this.page = page;
        this.headerShopName = page.getByRole('heading', { name: 'Shop Name' });
 
    }
    async verifyShopNameHeader()
    {
        await expect(this.headerShopName).toBeVisible();
    }

}
module.exports = {ShopPage}