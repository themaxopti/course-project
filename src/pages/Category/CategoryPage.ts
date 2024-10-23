import { CategoryProductCard } from "../../components/category-product-card/category-product-card.ts";
import { FilterPanel } from "../../components/filter-panel/filter-panel.ts";
import { Navigation } from "../../components/Navigation/Navigation.ts";
import { router } from "../../router/router.ts";
import { createHTMLElement } from "../../utils/create-html-element.ts";
import { fetchData } from "../../utils/fetch-data.ts";
import { PageBaseClass } from "../PageBaseClass.ts";
import { Product } from "./product.model.ts";

const BASE_URL_CATEGORY: string = 'https://dummyjson.com/products/category/';

export class CategoryPage extends PageBaseClass {
  categoryName: string;
  brands: string[] = [];
  categoryData: Product[];
  cardsBlock: HTMLElement;
  categoryPageContainer: HTMLElement;

  constructor(title: string) {
    super([
      new Navigation().render(),
    ]);
    this.categoryName = title;

    this.page.classList.add("category-page");

    this.categoryPageContainer = createHTMLElement('div', ['div-category-page-container']);
    this.page.append(this.categoryPageContainer);

    const cardsContainer = createHTMLElement('div', ['all-cards-container']);
    this.categoryPageContainer.append(cardsContainer);

    const titleCardsBlock = createHTMLElement('h2', ['h2-title-cards-block']);
    titleCardsBlock.textContent = this.categoryName;
    cardsContainer.append(titleCardsBlock);

    this.cardsBlock = createHTMLElement('div', ['all-cards-block']);
    cardsContainer.append(this.cardsBlock); 
  }


  async renderCards() {

    const data = await fetchData(`${BASE_URL_CATEGORY}${this.categoryName}`);

    this.categoryData = data.products;
    console.log('dat', data);
    console.log(this.categoryData);
      this.categoryData?.forEach((product: Product) => {
        if (product.brand) this.brands.push(product.brand);

        const productCard = new CategoryProductCard(product).render();
        productCard.addEventListener('click', () => {
          router.navigate(`/product/${product.id}`);
        })
        this.cardsBlock.append(productCard);
      });
  }

  renderFilterPanel() {
    this.categoryPageContainer.append(new FilterPanel(this.brands).render());
  }

  async render() {
    this.appendHeaderAndFooter();
    await this.renderCards();
    this.renderFilterPanel();

    return this.page;
  }
}
