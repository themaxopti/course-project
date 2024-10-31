import { BrandsLine } from "../../components/brands-line/brands-line.ts";
import { MainBanner } from "../../components/main-banner/main-banner.ts";
import { MainCategories } from "../../components/main-categories/main-categories.ts";
import { PageBaseClass } from "../PageBaseClass.ts";

export class MainPage extends PageBaseClass {
  constructor() {
    super([
      new MainBanner().render(),
      new BrandsLine().render(),
      new MainCategories().render(),
    ]);
    this.page.classList.add("main-page");
  }
}
