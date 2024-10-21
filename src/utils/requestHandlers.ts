import { ENV } from "../../env.ts";
import axios from "axios";
import { store } from "../state/store.ts";
import { setUser } from "../state/actions/user/userActions.ts";
import { router } from "../router/router.ts";
import { Category } from "../components/main-categories/category-api.model.ts";
import { createHTMLElement } from "./create-html-element.ts";

export const requestHandlers = {
  signIn: (username: string, password: string) => {
    axios
      .post(`${ENV.BASE_URL}auth/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        store.dispatch(setUser(data));
        router.navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
      });
  },

  getCategories: (containerCategories: HTMLElement) => {
    axios
      .get(`${ENV.BASE_URL}products/categories`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((data: Category[]) => {
        data.forEach((category) => {
          const cardCategory = createHTMLElement("button", [
            "btn-card-category",
          ]);
          cardCategory.textContent = category.name;
          cardCategory.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            router.navigate(`/category/${category.slug}`);
          });
          containerCategories.append(cardCategory);
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        throw new Error(error);
      });
  },
};
