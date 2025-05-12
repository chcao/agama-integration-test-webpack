import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";
import { type Page } from "puppeteer-core";

export class CreateFirstUserPage {
  private readonly page: Page;
  private readonly fullNameInput = () => this.page.locator("input#userFullName");
  private readonly usernameInput = () => this.page.locator("input#userName");
  private readonly passwordInput = () =>
    this.page.locator("input#password, input[name='password'], input[type='password']");

  private readonly passwordConfirmationInput = () =>
    this.page.locator("input#passwordConfirmation");

  private readonly acceptButton = () => this.page.locator("button[form='firstUserForm']");

  constructor(page: Page) {
    this.page = page;
  }

  async fillFullName(fullName: string) {
    await this.fullNameInput().fill(fullName);
  }

  async fillUserName(userName: string) {
    await this.usernameInput().fill(userName);
  }

  async fillPassword(password: string) {
    await this.passwordInput().fill(password);
  }

  async fillPasswordConfirmation(password: string) {
    await this.passwordConfirmationInput().fill(password);
  }

  async accept() {
    await this.acceptButton().click();
  }

  async ensureDirectoryExistence(dirPath: string) {
    const resolvedPath = resolve(dirPath);
    if (!existsSync(resolvedPath)) {
      mkdirSync(resolvedPath, { recursive: true });
      console.log(`Directory created: ${resolvedPath}`);
    } else {
      console.log(`Directory already exists: ${resolvedPath}`);
    }
  }

  async takeScreenshot() {
    const screenshotBuffer = await this.page.screenshot();
    this.ensureDirectoryExistence("/run/agama/scripts");
    const screenshotPath = resolve("/run/agama/scripts", "overview_page_screenshot.png");
    writeFileSync(screenshotPath, screenshotBuffer);
  }
}
