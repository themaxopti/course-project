import { createDiv } from "../../helpers/createHtmlTags";
import { PageBaseClass } from "../PageBaseClass";

export class NotFoundPage extends PageBaseClass {
  element: HTMLDivElement | null = null;

  constructor() {
    super([document.createElement("main")]);
    const container = createDiv("", "container");

    container.innerHTML = "<br /> This page does not exist";
    this.page.append(container);
  }
}
