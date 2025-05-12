import { it, page, sleep, dumpPage } from "../lib/helpers";
import { CreateFirstUserPage } from "../pages/create_user_page";
import { UsersPage } from "../pages/users_page";
import { SidebarPage } from "../pages/sidebar_page";

export function createFirstUser(password: string) {
  it("should create first user", async function () {
    const users = new UsersPage(page);
    const createFirstUser = new CreateFirstUserPage(page);
    const sidebar = new SidebarPage(page);

    await sidebar.goToUsers();

    await users.defineAUserNow();
    await createFirstUser.fillFullName("Bernhard M. Wiedemann");
    await createFirstUser.fillUserName("bernhard");
    await createFirstUser.takeScreenshot();
    await dumpPage("create_first_user_before_password");
    await createFirstUser.fillPassword(password);
    await createFirstUser.fillPasswordConfirmation(password);
    await createFirstUser.accept();

    // Wait longer for the backend to process the user creation
    await sleep(4000);
  });
}
