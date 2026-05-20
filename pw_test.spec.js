const { test, expect, chromium } = require('@playwright/test');

test('screenshot register event', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto('http://localhost:8899');
  await page.waitForTimeout(3000);
  
  // Find and click the register screen button in sidebar
  const allButtons = page.locator('aside').locator('button');
  const count = await allButtons.count();
  for (let i = 0; i < count; i++) {
    const btn = allButtons.nth(i);
    const txt = await btn.textContent();
    if (txt && txt.trim() === 'Đăng ký sự kiện') {
      await btn.click();
      break;
    }
  }
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'd:/WORKSPACE_mtt/MobileApp/screenshots/register_event_current.png' });
  await browser.close();
});
