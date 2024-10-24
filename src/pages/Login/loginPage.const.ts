import { FormOptionsModel } from "../../components/login/form/FormOptions.model.ts";
import { InputEnum } from "../../components/login/input/InputEnum.ts";

export const formOptions: FormOptionsModel = {
  title: "Login",
  fields: [
    {
      type: InputEnum.USERNAME,
      textContent: "Username",
      id: "username",
      validationRules: [
        { regex: /^.{3,}$/, message: "Username has at least 3 characters" },
      ],
    },
    {
      type: InputEnum.PASSWORD,
      textContent: "Password",
      id: "password",
      validationRules: [
        { regex: /^.{6,}$/, message: "Password has at least 6 characters" },
      ],
    },
  ],
  submit: {
    textContent: "Login",
    handlerName: "signIn",
    sendId: ["username", "password"],
  },
};
