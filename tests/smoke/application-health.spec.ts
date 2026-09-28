import { expect, test } from '@playwright/test';

test.describe('Application health', () => {

  test('global feed is available to an anonymous user', async ({page,}) => {

    await page.goto('/');
    await expect(page).toHaveTitle(/conduit/i);
    await expect(page.getByRole('link', { name: 'Global Feed' }),).toBeVisible();

  });

});