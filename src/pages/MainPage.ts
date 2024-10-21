import { TestPage } from "./TestPage";
import { PageBaseClass } from "./PageBaseClass.ts";


export class MainPage extends PageBaseClass {
  constructor() {
    super(new TestPage().render())
  }

  render() {
    this.appendHeaderAndFooter();
    return this.page;
  }
}
