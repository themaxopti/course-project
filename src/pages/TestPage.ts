import { createDiv } from "../helpers/createHtmlTags";

export class TestPage {
  element: HTMLDivElement | null = null;

  constructor() {}

  render() {
    const page = createDiv(`
        <a href="/" data-navigo>Navigate to main</a>
    `);

    return page;
  }
}
