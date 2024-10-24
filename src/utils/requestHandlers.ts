import { ENV } from "../../env.ts";
import axios from "axios";
import { store } from "../state/store.ts";
import { setUser } from "../state/actions/user/userActions.ts";
import { router } from "../router/router.ts";
import { Category } from "../components/main-categories/category-api.model.ts";
import { createHTMLElement } from "./create-html-element.ts";

export const requestHandlers = {
  signIn: async (username: string, password: string) => {
    try {
      const response = await axios.post(`${ENV.BASE_URL}auth/login`, {
        username: username,
        password: password,
      });
      const data = response.data;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      data.userType = "limited";
      store.dispatch(setUser(data));
      router.navigate("/checkout");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "An unknown error occurred";
      throw new Error(errorMessage);
    }
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

  checkout: () => {
    router.navigate("/payment");
  },

  payment: () => {
    router.navigate("/order-confirmation");
  },

  getUser: async () => {
    try {
      const response = await axios.get(`${ENV.BASE_URL}auth/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      response.data.userType = "full";
      store.dispatch(setUser(response.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  },
};
