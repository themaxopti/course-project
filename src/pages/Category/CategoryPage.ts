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

  constructor(categoryName: string) {
    super([
      new Navigation(['category',categoryName]).render(),
    ]);

    this.categoryName = categoryName;

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

  async fetchProductsData() {
    return await fetchData(`${BASE_URL_CATEGORY}${this.categoryName}`);
  }


  async renderCards(brandsFilter: string[] = [], price: number[] = [10, 20000000]) {

   this.cardsBlock.innerHTML = '';

    const data = await fetchData(`${BASE_URL_CATEGORY}${this.categoryName}`);

    data.products.forEach((product: Product) => {
      if (product.brand) this.brands.push(product.brand);
        this.brands = [...new Set(this.brands)];
    })

    const filteredData = data.products.filter((product: Product) => {
      let priceAfterDiscount = product.price * (100 - product.discountPercentage) / 100;
      priceAfterDiscount = +priceAfterDiscount.toFixed(2);
      if (!brandsFilter.length) {
        return priceAfterDiscount >= price[0] && priceAfterDiscount <= price[1]
      } else {
        return priceAfterDiscount >= price[0] && priceAfterDiscount <= price[1] && brandsFilter.includes(product.brand);
      }
    });

      filteredData.forEach((product: Product) => {
        const productCard = new CategoryProductCard(product).render();
        productCard.addEventListener('click', () => {
          router.navigate(`/product/${product.id}`);
        })
        this.cardsBlock.append(productCard);
      });
  }

  renderFilterPanel() {
    const filterPanel = new FilterPanel(
      this.brands,
      async (selectedBrands, priceRange) => {
        await this.renderCards(selectedBrands, priceRange);
      },
      async () => {
        await this.renderCards();
      }
    );
    const filtersContainer = createHTMLElement('div', ['div-filters-container-on-page']);
    this.categoryPageContainer.prepend(filtersContainer);
    filtersContainer.prepend(filterPanel.render());
  }

  async render() {
    this.appendHeaderAndFooter();
    await this.renderCards();
    this.renderFilterPanel();
    return this.page;
  }
}
