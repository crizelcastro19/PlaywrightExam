import {test} from '@playwright/test';
import { POManager } from '../pageObject/POManager';

test.describe('Test Website', ()=>{
    let poManager;
    let shopPage;

    test.beforeEach(async({page})=>{
        poManager = new POManager(page);
        shopPage = poManager.getShopPage();
    });
    
    test('Verify if the user redirect to Shop Dashboard', async({page}) =>{
        await page.goto('/angularpractice/shop'); 
        await shopPage.verifyShopNameHeader();
    });

});