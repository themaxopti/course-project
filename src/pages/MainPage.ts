import { CounterComponent } from "../components/Counter";
import { createDiv } from "../helpers/createHtmlTags";

export class MainPage {
  element: HTMLDivElement | null = null;
  children: [CounterComponent];

  constructor() {
    this.children = [new CounterComponent()];
  }

  render() {
    const page = createDiv(`
        <a href="test" data-navigo>Test link</a>
    `);

    this.children.forEach((child) => {
      page.appendChild(child.render());
    });

    return page;
  }
}
