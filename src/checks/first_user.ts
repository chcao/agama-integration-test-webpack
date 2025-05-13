import { it, page } from "../lib/helpers";
import { CreateFirstUserPage } from "../pages/create_user_page";
import { AuthenticationPage } from "../pages/authentication_page";
import { SidebarPage } from "../pages/sidebar_page";

export function createFirstUser(password: string) {
  it("should create first user", async function () {
    const authentication = new AuthenticationPage(page);
    const createFirstUser = new CreateFirstUserPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToAuthentication();

    await authentication.defineAUserNow();
    await createFirstUser.fillFullName("Bernhard M. Wiedemann");
    await createFirstUser.fillUserName("bernhard");
    await createFirstUser.fillPassword(password);
    await createFirstUser.fillPasswordConfirmation(password);
    await createFirstUser.accept();
    // Wait for the "Define a user now" button to disappear
    await page.waitForSelector("a[href='#/users/first/edit']", { timeout: 5000, hidden: true });
  });
}
