import {expect, test} from "./fixtures";

const VIEWPORTS = [
    {width: 360, height: 780},
    {width: 768, height: 1024},
    {width: 1440, height: 900},
];

for (const viewport of VIEWPORTS) {
    for (const path of ["/en", "/es/data"]) {
        test(`fits ${path} in a ${viewport.width}px viewport without clipped content`, async ({page}) => {
            await page.setViewportSize(viewport);
            await page.goto(path);

            const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
            expect(overflow).toBeLessThanOrEqual(0);

            const ascii = page.locator("#about pre");
            await expect(ascii).toBeVisible();
            const asciiFits = await ascii.evaluate((element) => {
                const box = element.getBoundingClientRect();
                const frame = element.parentElement!.getBoundingClientRect();
                return element.scrollWidth <= element.clientWidth + 1 && box.left >= frame.left - 1 && box.right <= frame.right + 1;
            });
            expect(asciiFits).toBe(true);

            const photo = page.locator("#home picture img");
            await photo.scrollIntoViewIfNeeded();
            await expect.poll(() => photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
        });
    }
}

for (const viewport of VIEWPORTS) {
    for (const path of [
        "/en/projects", "/es/projects/integration-platform", "/en/projects/smartpot", "/es/projects/computer-engineering",
        "/es/experience/tivenos", "/en/education/computer-engineering", "/en/certifications/search-console-seo", "/es/organizations/engineeringsebastian-s",
        "/en/certifications",
    ]) {
        test(`fits ${path} in a ${viewport.width}px viewport`, async ({page}) => {
            await page.setViewportSize(viewport);
            await page.goto(path);
            const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
            expect(overflow).toBeLessThanOrEqual(0);
        });
    }
}
