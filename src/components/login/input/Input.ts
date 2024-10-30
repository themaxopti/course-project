import { InputEnum } from "./InputEnum.ts";
import { FormFieldModel, FormFieldValidationRule } from "../form/FormOptions.model.ts";

export class Input {
  readonly container: HTMLElement;
  readonly node: HTMLInputElement;
  private errorNode: HTMLElement = null;
  private readonly validationRules: FormFieldValidationRule[];
  realValue?: string;
  valid: boolean = true;

  constructor(formField: FormFieldModel) {
    this.container = document.createElement("div");
    this.container.classList.add("login-input__container");
    this.node = document.createElement("input");
    this.node.type = formField.type as string;
    this.node.classList.add("login-input");
    this.container.append(this.node);

    if (formField.type === InputEnum.SUBMIT) {
      this.node.value = formField.textContent;
    } else {
      this.node.placeholder = formField.textContent;
    }

    if (formField.validationRules) {
      this.validationRules = formField.validationRules;
      this.validate();
    }

    if (formField.addDivider) {
      this.addDivider();
    }

    if (formField.formatter) {
      this.formatInput(formField.formatter);
    }

    if (formField.id) {
      this.node.id = formField.id;
    }

    if (formField.value) {
      this.node.value = formField.value;
      if (formField.formatter === "card") {
        this.formatCard();
      } else if (formField.formatter === "phone") {
        this.formatPhone();
      }
    }
  }

  formatInput(formatter: string) {
    this.node.addEventListener("input", () => {
      if (formatter === "card") {
        this.formatCard();
      } else if (formatter === "phone") {
        this.formatPhone();
      } else if (formatter === 'cardExpire') {
        this.formatCardExpire();
      }
    });
  }


  formatCard() {
    let value = this.node.value.replace(/\D/g, "").trim();
    value = value.replace(/(.{4})/g, "$1 ").trim();

    this.node.value = value;
    this.realValue = value.replace(/\s/g, "");
  }

  formatCardExpire() {
    let value = this.node.value.replace(/\D/g, "").trim();
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    value = value.slice(0, 5);
    this.node.value = value;
    this.realValue = value.replace("/", "");
  }

  formatPhone() {
    const value = this.node.value.replace(/\D/g, "").replace(/-/g, "");
    this.node.value = value.replace(/(\d{1,2})(\d{1,3})(\d{1,3})(\d{1,4})/, (_, p1, p2, p3, p4) => {
      let result = "";
      if (p1) result += `+${p1}`;
      if (p2) result += ` ${p2}`;
      if (p3) result += ` ${p3}`;
      if (p4) result += ` ${p4}`;
      return result;
    });
    this.realValue = value.replace(/\s/g, "");
  }

  addDivider() {
    this.container.classList.add("login-input__container--divider");
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
    this.removeError();
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
    return this.container;
  }
}
