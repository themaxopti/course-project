import { FormOptionsModel } from "./FormOptions.model.ts";
import { Input } from "../input/Input.ts";
import { InputEnum } from "../input/InputEnum.ts";

export class Form {
  private readonly node: HTMLFormElement;
  private readonly fields: Input[] = [];

  constructor(options: FormOptionsModel) {
    this.node = document.createElement("form");
    this.node.classList.add("login-form");
    const title = document.createElement("h2");
    title.textContent = options.title;
    this.node.append(title);

    options.fields.forEach((field) => {
      const input = new Input(field.type as InputEnum, field.placeholder, field.validationRules);
      this.fields.push(input);
      this.node.append(input.render());
    });

    const submitButton = new Input(
      InputEnum.SUBMIT,
      options.submitButton
    ).render();
    this.node.append(submitButton);

    this.node.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      let valid = true;
      this.fields.forEach((field) => {
        if (!field.valid) {
          valid = false;
        }
        if (field.node.value === "") {
          field.setError("Field cannot be empty");
          valid = false;
        }
      });

      if (valid) {
        console.log("submitting");
      } else {
        console.log("not submitting");
      }
    });
  }

  render() {
    return this.node;
  }
}
