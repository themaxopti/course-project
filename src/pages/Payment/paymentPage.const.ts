import { FormOptionsModel } from "../../components/login/form/FormOptions.model.ts";
import { InputEnum } from "../../components/login/input/InputEnum.ts";

export const formOptions: FormOptionsModel = {
  submit: {
    textContent: null,
    handlerName: "payment",
    sendId: [],
  },
  fields: [
    {
      type: InputEnum.TEXT,
      formatter: "card",
      textContent: "Card Number",
      validationRules: [
        { regex: /^.{3,}$/, message: "First Name has at least 3 characters" },
      ],
    },
    {
      type: InputEnum.TEXT,
      textContent: "Card Expire",
      validationRules: [
        { regex: /^.{3,}$/, message: "Last Name has at least 3 characters" },
      ],
    },
    {
      type: InputEnum.TEXT,
      textContent: "IBAN",
      validationRules: [
        { regex: /^.{3,}$/, message: "Maiden Name has at least 3 characters" },
      ],
    }
  ]
}

export const summaryButton = {
  buttonText: "Place an Order",
  buttonAction: (e: Event) => {
    e.preventDefault();
    const form = document.querySelector("#payment-form") as HTMLFormElement;
    form.requestSubmit();
  },
};
