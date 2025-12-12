import { test, expect } from '@playwright/test'

test('visual regression', async ({ page }) => {
  await page.goto('/mentorship/faqs')
  await expect(page).toHaveScreenshot('/screenshots/faq.page.png', { fullPage: true })
})