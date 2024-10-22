import { createDiv } from "../../helpers/createHtmlTags";
import arrow from "../../assets/navigation/arrow.svg";

export class Navigation {
  element: HTMLDivElement | null = null;
  children: any[];
  routes: string[];
  routeTitles = {
    ["order-confirmation"]: "Order Confirmation",
  };

  constructor() {
    let routes: string[] | string = window.location.pathname;
    routes = routes.split("/");
    routes.shift();

    this.routes = routes.map((route) => {
      return this.routeTitles[route] || route;
    });
  }

  render() {
    this.element = createDiv(
      `
      <div class="container">
        <div class="router-navigation">
            <div class="router-navigation__link">
                <div>Home</div>
                <img src=${arrow} />
            </div>
            ${this.routes
                .map((el) => {
                return `
                    <div class="router-navigation__link">
                        <div>${el}</div>
                        <img src=${arrow} />
                    </div>
                    `;
                })
                .join("")
            }
        </div>
    </div>
    `,
      "wrapper"
    );

    return this.element;
  }
}
