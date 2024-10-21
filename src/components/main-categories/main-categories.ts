import { createHTMLElement } from "../../utils/create-html-element";
import { requestHandlers } from "../../utils/requestHandlers.ts";

export class MainCategories {
  private readonly node: HTMLElement;

  constructor() {
    this.node = createHTMLElement('div', ['div-categories-all']);

    const titleCategories = createHTMLElement('h2', ['h2-title-categories']);
    titleCategories.textContent = 'Categories';
    titleCategories.setAttribute('id', 'targetBlock');
    this.node.append(titleCategories);

    const containerCategories = createHTMLElement('div', ['div-container-categories']);
    this.node.append(containerCategories);

    try {
      requestHandlers.getCategories(containerCategories);
    } catch (error) {
      console.error('There was a problem with categories fetching:', error);
    }
  }

  render() {
    return this.node;
  }
}
