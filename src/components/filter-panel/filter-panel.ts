
import { createHTMLElement } from "../../utils/create-html-element.ts";

export class FilterPanel {
  readonly node: HTMLElement;
  brands: string[];

  constructor(brands: string[]) {
    this.brands = brands;
    this.node = createHTMLElement('div', ['all-filter-panel']);
    console.log(brands)
    this.node.textContent = this.brands[0];
  }

  render() {
    return this.node;
  }
}
