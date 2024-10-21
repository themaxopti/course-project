import { createHTMLElement } from "../../utils/create-html-element";
import Versace from '../../assets/brand-logo/versace.svg';
import Zara from '../../assets/brand-logo/zara.svg';
import Gucci from '../../assets/brand-logo/gucci.svg';
import Prada from '../../assets/brand-logo/prada.svg';
import CalvinKlein from '../../assets/brand-logo/calvin-klein.svg';

function createImg(path: string, className: string[]) {
  const newImg = document.createElement('img');
  newImg.setAttribute('src', path)
  newImg.classList.add(...className);
  return newImg;
}

export class BrandsLine {
  private readonly node: HTMLElement;
   
  constructor() {
    this.node = createHTMLElement('div', ['div-all-brands-line']);

    const brandsLineContainer = createHTMLElement('div', ['div-brands-line-container']);
    this.node.append(brandsLineContainer);

    const versaceBrand = createImg(Versace, ['img-brand-versace']);
    brandsLineContainer.append(versaceBrand);

    const zaraBrand = createImg(Zara, ['img-brand-zara']);
    brandsLineContainer.append(zaraBrand);

    const gucciBrand = createImg(Gucci, ['img-brand-gucci']);
    brandsLineContainer.append(gucciBrand);

    const pradaBrand = createImg(Prada, ['img-brand-prada']);
    brandsLineContainer.append(pradaBrand);

    const calvinCleinBrand = createImg(CalvinKlein, ['img-brand-calvin-clein']);
    brandsLineContainer.append(calvinCleinBrand);
  }

  render() {
    return this.node;
  }
}