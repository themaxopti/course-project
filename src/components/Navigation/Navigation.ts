import { createDiv } from "../../helpers/createHtmlTags";
import arrowSwg from '../../assets/navigation/arrow.svg'


export class Navigation {
  element: HTMLDivElement | null = null;
  routes: string[];

  constructor(paths?: string[]) {
    if (!paths) {
      let routes: string[] | string = window.location.pathname;
      routes = routes.split("/");
      routes.shift();
      this.routes = routes.map((route) => {
        return route;
      });
      return;
    }

    this.routes = paths.map((path) => {
      return path;
    });


  }

  render() {
    this.element = createDiv(
      `
      <div class="container">
        <div class="router-navigation">
            <div class="router-navigation__link">
                <div>Home</div>
                <img src="${arrowSwg}" />
            </div>
            ${this.routes
              .map((el) => {
                return `
                    <div class="router-navigation__link">
                        <div>${el}</div>
                        <img src="${arrowSwg}" />
                    </div>
                    `;
              })
              .join("")}
        </div>
    </div>
    `,
      "wrapper"
    );

    return this.element;
  }
}
