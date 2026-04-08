import { test, expect } from '@playwright/test';

test('carga la página principal', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Espera a que cargue algo visible (puedes ajustar esto)
  await expect(page).toHaveTitle(/.+/);
});