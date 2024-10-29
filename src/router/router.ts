import Navigo from "navigo";
import { MainPage } from "../pages/Main/MainPage.ts";
import { TestPage } from "../pages/TestPage";
import { LoginPage } from "../pages/Login/LoginPage.ts";
import { OrderConfirmationPage } from "../pages/OrderConfirmation/OrderConfirmation.ts";
import { ProductDetailPage } from "../pages/ProductDetail/ProductDetail.ts";
import { CheckoutPage } from "../pages/Checkout/CheckoutPage.ts";
import { PaymentPage } from "../pages/Payment/PaymentPage.ts";
import { CategoryPage } from "../pages/Category/CategoryPage.ts";
import { CartPage } from "../pages/Cart/CartPage.ts";
import { NotFoundPage } from "../pages/NotFound/NotFound.ts";

export const router = new Navigo("/", {});

let productDetailPage;

router.hooks({
  before: (done, params) => {
    if (!router.lastResolved()) {
      return done();
    }
    if (router.lastResolved()[0].route.name === "product/:id") {
      productDetailPage.destroy()
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1);
    }
    done();
  },
});

router.on("/", function () {
  const mainPage = new MainPage();
  document.querySelector("#root")!.innerHTML = "";
  document.querySelector("#root")?.append(mainPage.render());
});

router.on("/test", function () {
  const testPage = new TestPage();
  document.querySelector("#root")!.innerHTML = "";
  document.querySelector("#root")?.append(testPage.render());
});

router.on("/sign-in", function () {
  const loginPage = new LoginPage();
  document.querySelector("#root")!.innerHTML = "";
  document.querySelector("#root")?.append(loginPage.render());
});

router.on("/order-confirmation", function () {
  const orderConfirmationPage = new OrderConfirmationPage();
  document.querySelector("#root")!.innerHTML = "";
  document.querySelector("#root")?.append(orderConfirmationPage.render());
});

router.on("/product/:id", function (params) {
  // window.location.reload()
  productDetailPage = new ProductDetailPage(params.data.id);
  document.querySelector("#root")!.innerHTML = "";
  document.querySelector("#root")?.append(productDetailPage.render());
});

router.on("/checkout", function () {
  const checkoutPage = new CheckoutPage();
  document.querySelector("#root")!.innerHTML = "";
  document.querySelector("#root")?.append(checkoutPage.render());
});

router.on("/payment", function () {
  const paymentPage = new PaymentPage();
  document.querySelector("#root")!.innerHTML = "";
  document.querySelector("#root")?.append(paymentPage.render());
});

router.on("/category/:categoryName", function (obj) {
  const route = obj.url.split("/")[1];
  const categoryPage = new CategoryPage(route);
  document.querySelector("#root")!.innerHTML = "";

  categoryPage
    .render()
    .then((data) => document.querySelector("#root")?.append(data));
});

router.on("/cart/:cartId", function (obj) {
  const cartPage = new CartPage();
  document.querySelector("#root")!.innerHTML = "";
  document.querySelector("#root")?.append(cartPage.render());
});

router.notFound(function() {
  document.querySelector("#root")!.innerHTML = "";
  const notFoundPage = new NotFoundPage()
  document.querySelector("#root")?.append(notFoundPage.render());
})
