import { test as base, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/base/login.base';
import { requireEnv } from '../utils/require-env.util';
import { AppRoutes } from '../routes/app.routes';

type TestFixtures = {
  login: (user?: { email: string; password: string }) => Promise<void>;
};

type WorkerFixtures = {
  authenticatedContext: BrowserContext;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  authenticatedContext: [
    async ({ browser }, use, workerInfo) => {
      const baseURL = workerInfo.project.use.baseURL;
      const context = await browser.newContext({
        ...(baseURL ? { baseURL } : {}),
      });

      const page = await context.newPage();
      const loginPage = new LoginPage(page);
      
      console.log(`[AUTH] Navigating to login page. BaseURL: ${baseURL}`);
      await loginPage.goto();
      
      console.log('[AUTH] Waiting for network idle...');
      await page.waitForLoadState('networkidle');

      console.log('[AUTH] Waiting for domcontentloaded...');
      await page.waitForLoadState('domcontentloaded');

      console.log('[AUTH] Attempting to login...');
      await loginPage.loginAs(
        requireEnv('ADMIN_EMAIL'),
        requireEnv('ADMIN_PASSWORD')
      );
      
      console.log('[AUTH] Waiting for redirect to admin dashboard...');
      await page.waitForURL(new RegExp(AppRoutes.admin.base));
      console.log('[AUTH] Login successful.');
      
      await page.close();

      await use(context);

      await context.close();
    },
    { scope: 'worker' },
  ],

  context: [
    async ({ authenticatedContext }, use) => {
      await use(authenticatedContext);
    },
    { scope: 'test' },
  ],

  page: [
    async ({ context }, use) => {
      const page = await context.newPage();
      await use(page);
      await page.close();
    },
    { scope: 'test' },
  ],

  login: async ({ page }, use) => {
    const loginFn = async (
      user = {
        email: requireEnv('ADMIN_EMAIL'),
        password: requireEnv('ADMIN_PASSWORD'),
      }
    ) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.loginAs(user.email, user.password);
      await page.waitForURL(new RegExp(AppRoutes.admin.base));
    };

    await use(loginFn);
  },
});

export const expect = test.expect;
