import { chromium } from "@playwright/test";
import { POManager } from "../pageObject/POManager";
import { config } from '../utils/config';
import { log } from "node:console";

async function globalSetup() {
    const browser = await chromium.launch({ headless: true});
    const page = await browser.newPage();

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    if (!config.username || !config.password || !config.url) {
    
        throw new Error('LOGIN_USERNAME or LOGIN_PASSWORD not set in .env');
    }

    await page.goto(config.url); 
    await loginPage.verifyPasswordLabel();
    await loginPage.verifyInputUsername(config.username);
    await loginPage.verifyPasswordLabel();
    await loginPage.verifyInputPassword(config.password);
    await loginPage.verifyClickLogin();

    await page.context().storageState({ path: 'auth.json' });
    await browser.close();
    
}
export default globalSetup;