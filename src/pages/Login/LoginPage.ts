import { Form } from "../../components/login/form/Form.ts";
import { FormOptionsModel } from "../../components/login/form/FormOptions.model.ts";
import { InputEnum } from "../../components/login/input/InputEnum.ts";

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

export class LoginPage {
  private readonly page: HTMLElement;

  constructor() {
    this.page = document.createElement("main");
    this.page.classList.add("login-page");
    this.page.append(new Form(formOptions).render());
  }

  render() {
    return this.page;
  }
}
