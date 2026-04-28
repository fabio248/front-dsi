import { test as authedTest, expect } from '../../fixtures/auth.fixture';
import { LoginPage } from '../../pages/base/login.base';
import { requireEnv } from '../../utils/require-env.util';

const test = authedTest.extend({
  authenticatedContext: [
    async ({ browser }, use, workerInfo) => {
      const baseURL = workerInfo.project.use.baseURL;
      const context = await browser.newContext({
        ...(baseURL ? { baseURL } : {}),
      });
      await use(context);
      await context.close();
    },
    { scope: 'worker' },
  ],
});

test('admin can log in', async ({ page, login }) => {
  await login();
  await expect(page).toHaveURL(/admin/);
});

test('client can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginAs(requireEnv('CLIENT_EMAIL'), requireEnv('CLIENT_PASSWORD'));
  await expect(page).toHaveURL(/client/);
});

test('shows error on invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginAs('invalid@email.com', 'invalidpassword');
  await expect(page.getByText('Correo electrónico o contraseña incorrecta')).toBeVisible();
});
