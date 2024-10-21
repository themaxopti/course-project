import { FormOptionsModel } from "./FormOptions.model.ts";
import { Input } from "../input/Input.ts";
import { InputEnum } from "../input/InputEnum.ts";
import { store } from "../../../state/store.ts";
import { setUser } from "../../../state/actions/user/userActions.ts";
import axios from "axios";
import { router } from "../../../router/router.ts";

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
          this.setFormError("All fields are required.");
          valid = false;
        }
      });

      if (valid) {
        this.removeFormError();
        this.sendForm();
      } else {
        console.log("not submitting");
      }
    });
  }

  setFormError(message: string = 'Something went wrong. Try again.') {
    this.removeFormError();
    const errorNode = document.createElement("span");
    errorNode.classList.add("login-form__error-message");
    errorNode.textContent = message;
    this.node.append(errorNode);
  }

  removeFormError() {
    const errorNode = this.node.querySelector(".login-form__error-message");
    if (errorNode) {
      errorNode.remove();
    }
  }

  sendForm() {
    axios.post('https://dummyjson.com/auth/login', {
      username: this.fields[0].node.value,
      password: this.fields[1].node.value,
    })
      .then(response => {
        const data = response.data;
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        store.dispatch(setUser(data));
        router.navigate('/');
      })
      .catch(error => {
        console.log(error.response.data.message);
        this.setFormError(error.response.data.message);
      });
  }

  render() {
    return this.node;
  }
}
