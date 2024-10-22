export function createDiv(html: string = "", classes?: string) {
  const div = document.createElement("div");
  if (classes) {
    classes.split(" ").forEach((cl) => {
      div.classList.add(cl);
    });
  }
  div.innerHTML = html;
  return div;
}

export function createContainer(html: string, classes: string[] = []): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  const container = document.createElement("div");
  container.innerHTML = html;
  container.classList.add(`container`);
  classes.forEach(containerClass =>  container.classList.add(containerClass))

  wrapper.appendChild(container);

  return wrapper;
}
