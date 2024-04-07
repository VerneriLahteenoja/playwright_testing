const { test, expect } = require('@playwright/test')

test('front page can be opened', async ({ page }) => {
  await page.goto('http://localhost:5173')
  const locator = page.getByText('Blogs')
  await expect(locator).toBeVisible()
})

test('can open log in form', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByText('username')).toBeVisible()
  await expect(page.getByText('password')).toBeVisible()
})

test('can log in', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await page.getByRole('button', { name: 'Log in' }).click()

  await page.getByTestId('username').fill('superuser')
  await page.getByTestId('password').fill('superpass')
  
  await page.getByRole('button', { name: 'login' }).click()

  await expect(page.getByText('Super Tester logged in')).toBeVisible()
})