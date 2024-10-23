import { Product } from "../../pages/Category/product.model";
import { createHTMLElement } from "../../utils/create-html-element";
import './category-product-card.scss';

export class CategoryProductCard {
  readonly node: HTMLElement;
  title: string;
  rating: number;
  price: number;
  discountPercentage: number;
  img: string;
  brand: string;

  constructor(productData: Product) {
    this.title = productData.title;
    this.rating = productData.rating;
    this.price = productData.price;
    this.discountPercentage = productData.discountPercentage;
    this.img = productData.images[0];
    this.brand = productData.brand;

    this.node = createHTMLElement('div', ['div-category-product-card']);
    
    const imgContainer = createHTMLElement('div', ['div-img-container']);
    const cardImg = createHTMLElement('img', ['img-product-card']) as HTMLImageElement;
    cardImg.src = this.img;
    cardImg.alt = 'Product image';
    imgContainer.append(cardImg);
    this.node.append(imgContainer);

    const infoContainer = createHTMLElement('div', ['div-product-info']);

    const titleElement = createHTMLElement('h3', ['h3-product-title']);
    titleElement.textContent = this.title;
    infoContainer.append(titleElement);

    const brandElement = createHTMLElement('p', ['p-product-brand']);
    brandElement.textContent = this.brand;
    infoContainer.append(brandElement);

    const ratingContainer = createHTMLElement('div', ['div-product-rating']);
    const starsElement = this.createStarRating(this.rating);
    const ratingTextElement = createHTMLElement('span', ['span-rating-text']);
    ratingTextElement.textContent = this.rating.toFixed(1);
    ratingContainer.append(starsElement);
    ratingContainer.append(ratingTextElement);
    infoContainer.append(ratingContainer);

    const priceContainer = createHTMLElement('div', ['div-price-container']);
    
    const originalPriceElement = createHTMLElement('span', ['span-product-price', 'span-original-price']);
    originalPriceElement.textContent = `$${this.price.toFixed(2)}`;
    
    const discountElement = createHTMLElement('span', ['span-product-discount']);
    discountElement.textContent = `-${this.discountPercentage.toFixed(0)}%`;
    
    const discountedPrice = this.price * (1 - this.discountPercentage / 100);
    const discountedPriceElement = createHTMLElement('span', ['span-product-price', 'span-discounted-price']);
    discountedPriceElement.textContent = `$${discountedPrice.toFixed(2)}`;
    
    priceContainer.append(discountedPriceElement);
    priceContainer.append(originalPriceElement);
    priceContainer.append(discountElement);
    infoContainer.append(priceContainer);

    this.node.append(infoContainer);
  }

  private createStarRating(rating: number): HTMLElement {
    const starsContainer = createHTMLElement('div', ['div-stars-container']);
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      const star = createHTMLElement('span', ['span-star']);
      if (i < fullStars) {
        star.classList.add('full');
      } else if (i === fullStars && hasHalfStar) {
        star.classList.add('half');
      }
      starsContainer.append(star);
    }

    return starsContainer;
  }

  render() {
    return this.node;
  }
}
