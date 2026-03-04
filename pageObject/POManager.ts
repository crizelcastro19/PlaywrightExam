import { LoginPage } from "./LoginPage";
import { Page } from "@playwright/test";
import { ShopPage } from "./ShopPage";

export class POManager{

    loginPage: LoginPage;
    shopPage: ShopPage;
    page: Page;

    constructor(page: Page)
    {
        this.page= page;
        this.loginPage = new LoginPage(this.page);
        this.shopPage = new ShopPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getShopPage()
    {
        return this.shopPage;
    }
}
module.exports = {POManager}