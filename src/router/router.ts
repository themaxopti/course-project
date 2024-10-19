import Navigo from "navigo";
import { MainPage } from "../pages/MainPage";
import { TestPage } from "../pages/TestPage";

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