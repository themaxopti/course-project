import { Navigation } from "../../components/Navigation/Navigation";
import { OrderConfirmation } from "../../components/order-confirmation/order-confirmation";
import { createContainer } from "../../helpers/createHtmlTags";
import { router } from "../../router/router";
import { createHTMLElement } from "../../utils/create-html-element";
import { store } from "../../state/store";
import {
  isProductLoadingSelector,
  productBrandSelector,
  productCategorySelector,
  productDescriptionSelector,
  productDiscountSelector,
  productImagesSelector,
  productPriceSelector,
  productRatingSelector,
  productStockSelector,
  productTitleSelector,
} from "../../state/reducers/productReducer/productReducer";

export class ProductDetailImgages {
  element: HTMLDivElement;

  constructor(images: string[]) {
    const imagesContainer: HTMLDivElement = createHTMLElement("div", [
      "product-detail__images__example",
    ]) as HTMLDivElement;

    images.forEach((image, i) => {
      const img = document.createElement("img");
      img.setAttribute("src", image);

      const div = createHTMLElement("div", ["product-detail__image"]);

      if (i === 0) {
        div.classList.add("product-detail__image--active");
      }

      div.appendChild(img);
      imagesContainer.appendChild(div);
    });

    this.element = imagesContainer;
  }

  render() {
    return this.element;
  }
}

function calculatePercentage(max, min) {
  if (min > max) {
    throw new Error("Младшее число не может быть больше старшего числа.");
  }

  const percentage = (min / max) * 100;

  return percentage;
}

function calculateValueFromPercentage(number, percentage) {
  if (percentage < 0 || percentage > 100) {
    throw new Error("Процент должен быть в диапазоне от 0 до 100.");
  }

  const value = (percentage / 100) * number;

  return value;
}

function makeDiscount(price, percentage) {
  const procentValue = calculateValueFromPercentage(price, percentage);
  return price - procentValue;
}

export class ProductDetail {
  element: HTMLDivElement | null = null;
  unsubscribe: () => void
  
  constructor() {
    window.scrollTo({
      top: 0,
    });
    this.unsubscribe = store.subscribe(() => {
      if (isProductLoadingSelector() === false) {
        this.render();
        this.renderProductStars();
        this.addGaleryListeners();
      }
    });
  }

  addGaleryListeners() {
    const images: NodeListOf<HTMLImageElement> =
      document.querySelectorAll<HTMLImageElement>(".product-detail__image");

    images.forEach((div, i) => {
      div.addEventListener("click", () => {
        if (div.classList.contains("product-detail__image--active")) {
          return;
        }
        images.forEach((currDiv) => {
          currDiv.classList.remove("product-detail__image--active");
        });

        div.classList.add("product-detail__image--active");
        const imgPath: string = div.querySelector("img").src;
        document
          .querySelector<HTMLImageElement>(".product-detail__image--main img")
          .setAttribute("src", imgPath);
      });
    });
  }

  renderProductStars() {
    const productDetailStars: HTMLDivElement = document.querySelector(
      ".product-detail__info__stars"
    );
    const width = productDetailStars.getBoundingClientRect().width;

    const procent = calculatePercentage(5, productRatingSelector());
    const newWidth = calculateValueFromPercentage(width, procent);

    productDetailStars.style.width = `${newWidth}px`;
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe(); 
    }
  }

  render() {
    const productDetail = createContainer(
      store.getState().product.isLoading
        ? "loading"
        : `
        <div class="product-detail__images">
            ${new ProductDetailImgages(productImagesSelector()).render().outerHTML}
          <div class="product-detail__image--main"><img src="${productImagesSelector()[0]}" alt=""></div>
        </div>
        <div class="product-detail__info">
          <div class="product-detail__info__title">${productTitleSelector()}</div>
          <div class="product-detail__info__mark">
            <div class="product-detail__info__stars">
                <img src="/src/assets/product-detail/Star 1.svg" alt="">
                <img src="/src/assets/product-detail/Star 1.svg" alt="">
                <img src="/src/assets/product-detail/Star 1.svg" alt="">
                <img src="/src/assets/product-detail/Star 1.svg" alt="">
                <img src="/src/assets/product-detail/Star 1.svg" alt="">
            </div>
            <div>${productRatingSelector().toFixed(1)}/5</div>
          </div>
          <div class="product-detail__info__price">
            <div><span class="product-detail--real-price">
              $${makeDiscount(productPriceSelector(), productDiscountSelector()).toFixed(2)} 
              <span class="product-detail__dicsount__price">$${productPriceSelector()}</span>
            </div>
            <div class="product-detail--discount">-${productDiscountSelector().toFixed(0)}%</div>
          </div>
          <div class="product-detail__info__desc">
           ${productDescriptionSelector()}
          </div>
          <div class="product-detail__info__brand">
            <div>Brand</div>
            <div>${productBrandSelector() || "No brand"}</div>
          </div>
          <div class="product-detail__info__stock">
            <div>In stock</div>
            <div>${productStockSelector()} items</div>
          </div>
          <div class="product-detail__info__buttons">
            <div class="product-detail--count">
              <div class="product-detail--minus">-</div>
              <div>1</div>
              <div class="product-detail--plus">+</div>
            </div>
            <div class="product-detail--submit">
              Add to Cart
            </div>
          </div>
        </div>
    `,
      ["product-detail"]
    );

    const page = document.createElement("div");
    const navigation = new Navigation([
      isProductLoadingSelector() ? "..." : productCategorySelector(),
      isProductLoadingSelector() ? "..." : productTitleSelector(),
    ]).render();
    page.append(navigation);
    page.append(productDetail);

    if (this.element) {
      this.element.replaceWith(page);
    }
    this.element = page;

    return this.element;
  }
}
