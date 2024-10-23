import Navigo from "navigo";
import { MainPage } from "../pages/MainPage";
import { TestPage } from "../pages/TestPage";
import { LoginPage } from "../pages/Login/LoginPage.ts";
import { OrderConfirmationPage } from "../pages/OrderConfirmation/OrderConfirmation.ts";
import { ProductDetailPage } from "../pages/ProductDetail/ProductDetail.ts";

export const router = new Navigo('/', {});

router.on('/', function () {
  const mainPage = new MainPage()
  document.querySelector('#root')!.innerHTML = ''
  document.querySelector('#root')?.append(mainPage.render())
});

router.on('/test', function () {
  const testPage = new TestPage()
  document.querySelector('#root')!.innerHTML = ''
  document.querySelector('#root')?.append(testPage.render())
});

router.on('/sign-in', function () {
  const loginPage = new LoginPage()
  document.querySelector('#root')!.innerHTML = ''
  document.querySelector('#root')?.append(loginPage.render())
});

router.on('/order-confirmation', function () {
  const orderConfirmationPage = new OrderConfirmationPage()
  document.querySelector('#root')!.innerHTML = ''
  document.querySelector('#root')?.append(orderConfirmationPage.render())
});


router.on('/product-detail', function () {
  const productDetailPage = new ProductDetailPage()
  document.querySelector('#root')!.innerHTML = ''
  document.querySelector('#root')?.append(productDetailPage.render())
});


