const { test, describe, expect, beforeEach } = require('@playwright/test')


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        username: 'superuser',
        name: 'Super Tester',
        password: 'superpass'
      }
    })
    await page.goto('http://localhost:5173')
  })

  describe('when not logged in', () => {
    test('front page can be opened', async ({ page }) => {
      const locator = page.getByText('Blogs')
      await expect(locator).toBeVisible()
    })
    test('can open log in form', async ({ page }) => {
      await page.getByRole('button', { name: 'Log in' }).click()
      await expect(page.getByText('username')).toBeVisible()
      await expect(page.getByText('password')).toBeVisible()
    })
  })
  
  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Log in' }).click()
      await page.getByTestId('username').fill('superuser')
      await page.getByTestId('password').fill('superpass')
      await page.getByRole('button', { name: 'login' }).click()
    })
    test('can log in', async ({ page }) => {
      await expect(page.getByText('Super Tester logged in')).toBeVisible()
    })
    test('can create new blog', async ({ page }) => {
      await page.getByRole('button', { name: 'Add new blog' }).click()
      await page.getByTestId('title').fill('Playwright test blog')
      await page.getByTestId('author').fill('Test user')
      await page.getByTestId('url').fill('Nourl')
      await page.getByRole('button', { name: 'Add' }).click()
      await expect(page.getByText('a new blog Playwright test blog by Test user added')).toBeVisible()
    })
  })

})