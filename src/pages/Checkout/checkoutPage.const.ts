import { FormOptionsModel } from "../../components/login/form/FormOptions.model.ts";
import { InputEnum } from "../../components/login/input/InputEnum.ts";

export const formOptions: FormOptionsModel = {
  submit: {
    textContent: null,
    handlerName: "checkout",
    sendId: [],
  },
  fields: [
    {
      type: InputEnum.TEXT,
      textContent: "First Name",
      validationRules: [
        { regex: /^[A-Za-z]{3,32}$/, message: "First name must be between 3 and 32 letters" },
      ],
    },
    {
      type: InputEnum.TEXT,
      textContent: "Last Name",
      validationRules: [
        { regex: /^[A-Za-z]{3,32}$/, message: "Last name must be between 3 and 32 letters" },
      ],
    },
    {
      type: InputEnum.TEXT,
      textContent: "Maiden Name",
      addDivider: true,
      validationRules: [
        { regex: /^[A-Za-z]{3,32}$/, message: "Last name must be between 3 and 32 letters" },
      ],
    },
    {
      type: InputEnum.EMAIL,
      textContent: "Email",
      validationRules: [
        { regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          message: "Use real email like example@example.com" },
      ],
    },
    {
      type: InputEnum.TEXT,
      textContent: "Phone",
      formatter: "phone",
      addDivider: true,
      validationRules: [
        { regex: /^\+?[0-9]{1,3}?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
          message: "Incorrect phone number" },
      ],
    },
    {
      type: InputEnum.TEXT,
      textContent: "Address",
    },
    {
      type: InputEnum.TEXT,
      textContent: "City",
    },
    {
      type: InputEnum.TEXT,
      textContent: "Postal Code",
      validationRules: [
        { regex: /^.{3,}$/, message: "Postal Code has at least 3 characters" },
      ],
    },
  ]
}

export const summaryButton = {
  buttonText: "Go to Payment",
  buttonAction: (e: Event) => {
    e.preventDefault();
    const form = document.querySelector("#checkout-form") as HTMLFormElement;
    form.requestSubmit();
  },
};
