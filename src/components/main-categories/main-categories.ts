import Navigo from "navigo";
import { createHTMLElement } from "../../utils/create-html-element";
import { Category } from "./category-api.model";

export class MainCategories {
  private readonly node: HTMLElement;

  constructor() {
    this.node = createHTMLElement('div', ['div-categories-all']);

    const router = new Navigo('/');

    const titleCategories = createHTMLElement('h2', ['h2-title-categories']);
    titleCategories.textContent = 'Categories';
    titleCategories.setAttribute('id', 'targetBlock');
    this.node.append(titleCategories);

    const containerCategories = createHTMLElement('div', ['div-container-categories']);
    this.node.append(containerCategories);

    fetch('https://dummyjson.com/products/categories')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data: Category[]) => {
      data.forEach(category => {
        const cardCategory = createHTMLElement('button', ['btn-card-category']);
        cardCategory.textContent = category.name;
        cardCategory.addEventListener('click', (e: MouseEvent) => {
          e.preventDefault();
          router.navigate(`/category/${category.slug}`);
        });
        containerCategories.append(cardCategory);
      });
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }

  render() {
    return this.node;
  }
}