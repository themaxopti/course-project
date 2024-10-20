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
