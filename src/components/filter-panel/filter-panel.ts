import noUiSlider, { target } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { createHTMLElement } from '../../utils/create-html-element';
import ImgFilter from '../../assets/filters.svg';

export class FilterPanel {
  private filtersAll: HTMLElement;
  private container: HTMLElement;
  private overlay: HTMLElement;
  private brands: string[];
  private selectedBrands: Set<string> = new Set();
  private priceRange: [number, number] = [50, 200];
  private onApplyFilter: (brands: string[], priceRange: [number, number]) => void;
  private onResetFilter: () => void;
  private mobileToggle: HTMLElement;

  constructor(brands: string[], applyCallback: (brands: string[], priceRange: [number, number]) => void, resetCallback: () => void) {
    this.filtersAll = createHTMLElement('div', ['all-folters']);
    this.brands = brands;
    this.onApplyFilter = applyCallback;
    this.onResetFilter = resetCallback;
    this.container = createHTMLElement('div', ['div-filter-panel']);
    this.filtersAll.append(this.container);

    this.mobileToggle = createHTMLElement('img', ['img-filters-btn']);
    this.mobileToggle.setAttribute('src', ImgFilter);
    this.mobileToggle.addEventListener('click', () => this.toggleMobilePanel());
    this.filtersAll.append(this.mobileToggle);

    this.overlay = createHTMLElement('div', ['filter-overlay']);
    this.overlay.addEventListener('click', () => this.closeMobilePanel());
    document.body.append(this.overlay);
  }

  private toggleMobilePanel(): void {
    this.container.classList.toggle('mobile-open');
    this.overlay.classList.toggle('mobile-open');
  }

  private createBrandFilters(): HTMLElement {
    const brandContainer = createHTMLElement('div', ['div-brand-filters']);
    const title = createHTMLElement('h3', ['h3-title-filter']);
    title.textContent = 'Brands';
    brandContainer.append(title);

    this.brands.forEach(brand => {
      const brandElement = createHTMLElement('div', ['div-brand-item']);
      brandElement.textContent = brand;
      brandElement.addEventListener('click', () => this.toggleBrand(brand, brandElement));
      brandContainer.append(brandElement);
    });

    return brandContainer;
  }

  private toggleBrand(brand: string, element: HTMLElement): void {
    if (this.selectedBrands.has(brand)) {
      this.selectedBrands.delete(brand);
      element.classList.remove('selected');
    } else {
      this.selectedBrands.add(brand);
      element.classList.add('selected');
    }
  }

  private createPriceFilter(): HTMLElement {
    const priceContainer = createHTMLElement('div', ['div-price-filter']);
    const title = createHTMLElement('h3', ['h3-title-filter']);
    title.textContent = 'Price';
    priceContainer.append(title);

    const slider = createHTMLElement('div', ['div-slider']) as target;
    slider.id = "slider-round";
    const minPriceLabel = createHTMLElement('span', ['span-label-slider']);
    const maxPriceLabel = createHTMLElement('span', ['span-label-slider']);

    noUiSlider.create(slider as target, {
      start: [10, 2000],
      connect: true,
      range: {
        min: 10,
        max: 2000
      },
      step: 1,
      format: {
        to: (value) => Math.round(value),
        from: (value) => Number(value)
      }
    });

    const sliderInstance = slider.noUiSlider;

    if (sliderInstance) {
      sliderInstance.on('update', (values: (string | number)[]) => {
        this.priceRange = [parseInt(values[0].toString()), parseInt(values[1].toString())];
        minPriceLabel.textContent = `$${this.priceRange[0]}`;
        maxPriceLabel.textContent = `$${this.priceRange[1]}`;
      });
    }

    const priceRangeLabels = createHTMLElement('div', ['div-price-range-labels']);
    priceRangeLabels.append(minPriceLabel);
    priceRangeLabels.append(maxPriceLabel);

    priceContainer.append(slider);
    priceContainer.append(priceRangeLabels);
    return priceContainer;
  }

  private createButtons(): HTMLElement {
    const buttonContainer = createHTMLElement('div', ['div-filter-buttons']);

    const applyButton = createHTMLElement('button', ['btn-filter-action','btn-filter-action-apply']);
    applyButton.textContent = 'Apply Filter';
    applyButton.addEventListener('click', () => {
      this.onApplyFilter(Array.from(this.selectedBrands), this.priceRange);
      this.closeMobilePanel();
    });

    const resetButton = createHTMLElement('button', ['btn-filter-action', 'btn-filter-action-reset']);
    resetButton.textContent = 'Reset Filter';
    resetButton.addEventListener('click', () => {
      this.onResetFilter();
      this.closeMobilePanel();
    });

    buttonContainer.append(applyButton);
    buttonContainer.append(resetButton);
    return buttonContainer;
  }

  private closeMobilePanel(): void {
    this.container.classList.remove('mobile-open');
    this.overlay.classList.remove('mobile-open');
  }

  public render(): HTMLElement {
    const title = createHTMLElement('h2', ['h2-filter-panel-title']);
    title.textContent = 'Filters';

    const closeIcon = createHTMLElement('span', ['span-close-icon']);
    closeIcon.textContent = '✕';
    closeIcon.addEventListener('click', () => this.closeMobilePanel());

    title.append(closeIcon);

    this.container.append(title);
    this.container.append(this.createBrandFilters());
    this.container.append(this.createPriceFilter());
    this.container.append(this.createButtons());

    return this.filtersAll;
  }
}
