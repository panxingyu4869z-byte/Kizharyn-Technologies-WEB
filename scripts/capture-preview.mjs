import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('output/playwright', {recursive:true});
const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:1440,height:1000}});
for (const [name,path] of [['home','index.html'],['product','product.html'],['research','research.html'],['contact','contact.html?intent=product'],['product-de','de/product.html']]) {
  await page.goto(`http://127.0.0.1:4173/${path}`);
  await page.screenshot({path:`output/playwright/${name}.png`,fullPage:true});
}
await page.setViewportSize({width:390,height:844});
await page.goto('http://127.0.0.1:4173/de/product.html');
await page.screenshot({path:'output/playwright/product-de-mobile.png',fullPage:true});
await browser.close();
