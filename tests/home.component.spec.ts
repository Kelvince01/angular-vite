import { test, expect, type Page } from "@playwright/test";

test.describe("Tour of Heroes pages", () => {
  test("should load default route", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await expect(page).toHaveURL(/\/dashboard$/);
  });

  test("should allow edits", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.locator('[data-test="detail-link"]').first().click();

    await expect(page).toHaveURL(/\/detail\/\d+/);

    await page.locator("#hero-name").fill("lorem ipsum");

    await page.locator('[data-test="save-button"]').click();

    await expect(
      page.locator('[data-test="detail-link"]').first()
    ).toContainText("lorem ipsum");
  });

  test("should search for heroes", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.locator("#search-box").fill("nice");

    await expect(page.locator('[data-test="search-result-link"]')).toHaveCount(
      1
    );

    await page.locator('[data-test="search-result-link"]').click();

    await expect(page).toHaveURL(/\/detail\/12/);
  });

  test("should delete heroes", async ({ page }) => {
    await page.goto("http://localhost:5173/heroes");

    await expect(page.locator(".delete")).toHaveCount(9);

    await page.locator(".delete").first().click();

    await expect(page.locator(".delete")).toHaveCount(8);
  });

  test("should add heroes", async ({ page }) => {
    await page.goto("http://localhost:5173/heroes");

    await page.locator("#new-hero").fill("Lorem Ipsum");

    await page.locator(".add-button").click();

    await expect(page.locator(".delete")).toHaveCount(10);
  });
});
