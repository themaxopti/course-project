import { FormOptionsModel } from "./FormOptions.model.ts";
import { Input } from "../input/Input.ts";
import { InputEnum } from "../input/InputEnum.ts";
import { requestHandlers } from "../../../utils/requestHandlers.ts";

export class Form {
  private readonly node: HTMLFormElement;
  private readonly fields: Input[] = [];

  constructor(options: FormOptionsModel) {
    this.node = document.createElement("form");
    this.node.classList.add("login-form");

    if (options.title) {
      const title = document.createElement("h2");
      title.textContent = options.title;
      this.node.append(title);
    }

    options.fields.forEach((field) => {
      const input = new Input(field);
      this.fields.push(input);
      this.node.append(input.render());
    });

    if (options.submit.textContent) {
      const submitButton = new Input({
        type: InputEnum.SUBMIT as string,
        textContent: options.submit.textContent,
      }).render();
      this.node.append(submitButton);
    }

    if (options.submit.handlerName) {
      this.node.addEventListener("submit", this.handleSubmit.bind(this, options.submit));
    }
  }

  private setFormError(message: string = 'Something went wrong. Try again.') {
    this.removeFormError();
    const errorNode = document.createElement("span");
    errorNode.classList.add("login-form__error-message");
    errorNode.textContent = message;
    this.node.append(errorNode);
  }

  private removeFormError() {
    const errorNode = this.node.querySelector(".login-form__error-message");
    if (errorNode) {
      errorNode.remove();
    }
  }

  private async sendForm(submit: { handlerName: string, sendId?: string[] }) {
    try {
      const values = submit.sendId.map((id) => {
        const input = this.fields.find((field) => field.node.id === id);
        return input.realValue || input.node.value;
      });
      await requestHandlers[submit.handlerName](...values);
    } catch (error) {
      this.setFormError(error.message);
    }
  }

  private validateFields(): boolean {
    let valid = true;
    this.fields.forEach((field) => {
      const isValid = field.valid && field.node.value;
      field.node.classList.toggle("login-input--error", !isValid);
      if (!isValid) {
        valid = false;
      }
    });

    if (!valid) {
      this.setFormError("All fields are required.");
    } else {
      this.removeFormError();
    }

    return valid;
  }

  private async handleSubmit(submit: { handlerName: string, sendId?: string[] }, event: Event) {
    event.preventDefault();
    if (this.validateFields()) {
      try {
        await this.sendForm(submit);
      } catch (error) {
        this.setFormError(error.message);
      }
    }
  }

  render() {
    return this.node;
  }
}
