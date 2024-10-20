import { createDiv } from "../helpers/createHtmlTags";

export class TestPage {
  element: HTMLDivElement | null = null;

  constructor() {}

  render() {
    const page = createDiv(`
      <div style="margin-bottom:200px">
        <a href="/sign-in" data-navigo>Navigate to login</a>
      </div>
    `);

    return page;
  }
}
