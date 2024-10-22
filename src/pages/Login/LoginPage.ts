import { Form } from "../../components/login/form/Form.ts";
import { FormOptionsModel } from "../../components/login/form/FormOptions.model.ts";
import { InputEnum } from "../../components/login/input/InputEnum.ts";
import { PageBaseClass } from "../PageBaseClass.ts";
import { store } from "../../state/store.ts";
import { router } from "../../router/router.ts";

const formOptions: FormOptionsModel = {
  title: "Login",
  fields: [
    {
      type: InputEnum.USERNAME,
      placeholder: "Username",
      validationRules: [
        { regex: /^.{3,}$/, message: "Username has at least 3 characters" },
      ],
    },
    {
      type: InputEnum.PASSWORD,
      placeholder: "Password",
      validationRules: [
        { regex: /^.{6,}$/, message: "Password has at least 6 characters" },
      ],
    },
  ],
  submitButton: "Login",
};

export class LoginPage extends PageBaseClass {
  constructor() {
    super([document.createElement("main")]);
    this.page.classList.add("login-page");
    this.page.append(new Form(formOptions).render());

    this.userChanged();
    store.subscribe(() => {
      this.userChanged();
    });
  }

  userChanged() {
    const state = store.getState().user;
    if (state.username) {
      router.navigate("/");
    }
  }

  render() {
    this.appendHeaderAndFooter();
    return this.page;
  }
}
