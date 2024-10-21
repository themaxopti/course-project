export function createHTMLElement(tagName: string, className: string[]): HTMLElement {
  const newElem = document.createElement(tagName);
  newElem.classList.add(...className);
  return newElem;
}