import { createDiv } from "../helpers/createHtmlTags";
import visaSvg from "../assets/footer/visa.svg";
import mastercardSvg from "../assets/footer/mastercard.svg";
import applePaySvg from "../assets/footer/applepay.svg";
import paypalSvg from "../assets/footer/paypal.svg";
import googlePaySvg from "../assets/footer/googlepay.svg";
import githubSvg from "../assets/footer/github.svg";
import instagramSvg from "../assets/footer/instagram.svg";
import faceBookSvg from "../assets/footer/facebook.svg";
import twitterSvg from "../assets/footer/twitter.svg";
import cover from "../assets/footer/cover.svg";
import { store } from "../state/store.ts";
import { setIsSubscribed } from "../state/actions/orderSummaryActions.ts";
import { setIsDiscountHeaderExist } from "../state/reducers/componentsProperties/componentsProperties.ts";

const styledFooter = `
      <div class="container">
          <div class="footer__black-box">
              <div class="footer__black-box__title">STAY UPTO DATE ABOUT<br>OUR LATEST OFFERS</div>
              <div class="footer__black-box__form" id="footer__black-box__form" style="display: none">
                <div>
                  <img src=${cover}>
                  <input placeholder="Enter your email address" id="subscription-email-input" type="text">
                </div>
                <button id="subscription-email-button" type="button" class="footer__black-box__button">Subscribe to Newsletter</button>
              </div>
              <div class="footer__black-box__success" id="footer__black-box__success" style="display: none">
                <p>🎉 Success! You've subscribed to our newsletter.</p>
              </div>
          </div>
          <div class="footer__content">
            <div class="footer__content__main">
              <div class="logo-text">SHOP.CO</div>
              <p>We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
              <div class="footer__socials">
                <img src="${twitterSvg}" alt="">
                <img src="${faceBookSvg}" alt="">
                <img src="${instagramSvg}" alt="">
                <img src="${githubSvg}" alt="">
              </div>
            </div>
            <div class="footer__content__block">
              <div class="title">Company</div>
              <div class="links">
                <p>About</p>
                <p>Features</p>
                <p>Works</p>
                <p>Career</p>
              </div>
            </div>
            <div class="footer__content__block">
              <div class="title">Help</div>
              <div class="links">
                <p>Customer Support</p>
                <p>Delivery Details</p>
                <p>Terms & Conditions</p>
                <p>Privacy Policy</p>
              </div>
            </div>
            <div class="footer__content__block">
              <div class="title">FAQ</div>
              <div class="links">
                <p>Account</p>
                <p>Manage Deliveries</p>
                <p>Orders</p>
                <p>Payments</p>
              </div>
            </div>
            <div class="footer__content__block">
              <div class="title">Resources</div>
              <div class="links">
                <p>Free eBooks</p>
                <p>Development Tutorial</p>
                <p>How to - Blog</p>
                <p>Youtube Playlist</p>
              </div>
            </div>
          </div>
          <div class="footer__pay">
            <div class="footer__pay__desc">Shop.co © 2000-2023, All Rights Reserved</div>
            <div>
              <img src="${visaSvg}" alt="">
              <img src="${mastercardSvg}" alt="">
              <img src="${paypalSvg}" alt="">
              <img src="${applePaySvg}" alt="">
              <img src="${googlePaySvg}" alt="">
            </div>
          </div>
      </div>
`;

export class Footer {
  element: DocumentFragment | null = null;

  constructor() {}

  render() {
    this.element = document.createDocumentFragment();
    const footer = createDiv(styledFooter, "wrapper footer");
    this.element.appendChild(footer);

    setTimeout(() => {
      Footer.subscribeToNewsletter().then();
    }, 500);

    return this.element;
  }

  static async subscribeToNewsletter() {
    const subscriptionEmailInput = document.getElementById(
      "subscription-email-input"
    ) as HTMLInputElement;
    const subscriptionEmailButton = document.getElementById(
      "subscription-email-button"
    ) as HTMLButtonElement;
    const subscriptionForm = document.getElementById(
      "footer__black-box__form"
    ) as HTMLDivElement;
    const subscriptionSuccess = document.getElementById(
      "footer__black-box__success"
    ) as HTMLDivElement;

    const isSubscribed = store.getState().orderSummary.isSubscribed;
    if (isSubscribed) {
      store.dispatch(setIsDiscountHeaderExist(false));
      subscriptionForm.style.display = "none";
      subscriptionSuccess.style.display = "block";
      return;
    } else {
      subscriptionForm.style.display = "flex";
      subscriptionSuccess.style.display = "none";
    }

    subscriptionEmailInput.addEventListener("input", () => {
      if (
        subscriptionEmailInput.value &&
        Footer.validateEmail(subscriptionEmailInput.value)
      ) {
        subscriptionEmailInput.parentElement.style.border = "none";
      } else {
        subscriptionEmailInput.parentElement.style.border = "2px solid red";
      }
    });

    subscriptionEmailButton.addEventListener("click", async () => {
      if (
        subscriptionEmailInput.value &&
        Footer.validateEmail(subscriptionEmailInput.value)
      ) {
        subscriptionEmailButton.innerText = "Subscribing...";
        Footer.mockSubscribeToNewsletter(subscriptionEmailInput.value).then(
          () => {
            store.dispatch(setIsSubscribed(true));
            store.dispatch(setIsDiscountHeaderExist(false));
            subscriptionEmailButton.innerText = "Subscribe to Newsletter";
            subscriptionForm.style.display = "none";
            subscriptionSuccess.style.display = "block";
          }
        );
      }
    });
  }

  static validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static async mockSubscribeToNewsletter(email: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Subscribe to newsletter for email:", email);
        resolve(true);
      }, 2000);
    });
  }
}
