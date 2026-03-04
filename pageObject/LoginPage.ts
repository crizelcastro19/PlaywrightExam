import {test,expect,Locator,Page} from '@playwright/test';

export class LoginPage{

    page: Page;
    labelUsername: Locator;
    inputUserName: Locator;
    labelPassword: Locator;
    inputPassword: Locator;
    chkRole: Locator;
    drpRole: Locator;
    chkTermsAndConditions: Locator;
    btnSignIn: Locator;
    //create a constructor
    constructor(page: Page)
    {
        this.page = page;
        this.labelUsername = page.locator('[for="username"]');
        this.inputUserName = page.getByLabel('Username');
        this.labelPassword = page.locator('[for="password"]');
        this.inputPassword = page.getByLabel('Password');
        this.chkRole = page.getByLabel('User');
        this.drpRole = page.getByRole('combobox');
        this.chkTermsAndConditions= page.getByRole('checkbox', { name: 'terms'});
        this.btnSignIn = page.locator('#signInBtn');
    }
    async verifyUsernameLabel()
    {
        await expect(this.labelUsername).toBeVisible();
    }

    async verifyInputUsername(username: string)
    {
        await this.inputUserName.fill(username);
    }

    async verifyPasswordLabel()
    {
        await expect(this.labelPassword).toBeVisible();
    }

    async verifyInputPassword(password: string)
    {
        await this.inputPassword.fill(password);
    }

    async verifyClickLogin()
    {
        await this.btnSignIn.click();
    }
}
module.exports = {LoginPage}