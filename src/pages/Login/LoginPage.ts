import { Form } from "../../components/login/form/Form.ts";
import { PageBaseClass } from "../PageBaseClass.ts";
import { store } from "../../state/store.ts";
import { router } from "../../router/router.ts";
import { formOptions } from "./loginPage.const.ts";

export class LoginPage extends PageBaseClass {
  constructor() {
    super([document.createElement("main")]);
    this.page.classList.add("login-page");
    this.page.append(new Form(formOptions).render());

    this.userChanged();
  }

  userChanged() {
    const state = store.getState().user;
    if (state.username) {
      router.navigate("/");
    }
  }
}
