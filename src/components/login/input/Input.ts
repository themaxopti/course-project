import { InputEnum } from "./InputEnum.ts";
import { FormFieldValidationRule } from "../form/FormOptions.model.ts";

export class Input {
  readonly node: HTMLInputElement;
  private errorNode: HTMLElement = null;
  private readonly validationRules: FormFieldValidationRule[];
  valid: boolean = true;

  constructor(type: InputEnum, text: string, validationRules?: FormFieldValidationRule[]) {
    this.node = document.createElement("input");
    this.node.type = type;
    this.node.classList.add("login-input");

    if (type === InputEnum.SUBMIT) {
      this.node.value = text;
    } else {
      this.node.placeholder = text;
    }

    if (validationRules) {
      this.validationRules = validationRules;
      this.validate();
    }
  }

  validate() {
    if (this.validationRules) {
      this.node.addEventListener("input", () => {
        for (const rule of this.validationRules) {
          if (!this.validateRegex(rule.regex)) {
            this.removeError();
            this.setError(rule.message);
          } else {
            this.removeError();
          }
        }
      });
    }
  }

  validateRegex(regex: RegExp) {
    return regex.test(this.node.value);
  }

  setError(message: string) {
    this.node.classList.add("login-input--error");
    this.errorNode = document.createElement("span");
    this.errorNode.classList.add("login-input__error-message");
    this.errorNode.textContent = message;
    this.node.after(this.errorNode);
    this.valid = false;
  }

  removeError() {
    this.node.classList.remove("login-input--error");
    if (this.errorNode) {
      this.errorNode.remove();
      this.errorNode = null;
    }
    this.valid = true;
  }

  render() {
    return this.node;
  }
}
