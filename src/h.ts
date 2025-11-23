export async function h(
  tag: string | (() => Promise<Element>),
  props: any,
  ...childs: Array<string | number>
): Promise<Element> {
  //call component
  if (typeof tag == "function") {
    return await tag();
  }

  //childs
  const el = document.createElement(tag);
  childs = childs.flat();
  el.innerText = childs.join("");
  return el;
}
