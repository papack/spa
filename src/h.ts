import type { JsxChild } from "./child";

export async function h(
  tag: string | (() => Promise<Element>),
  props: any,
  ...childs: Array<JsxChild>
): Promise<Element> {
  //call component
  if (typeof tag == "function") {
    return await tag();
  }

  //create element
  const el = document.createElement(tag);

  //no childs
  if (!childs) {
    return el;
  }

  //maybe someone use array, so we need to flat
  childs = childs.flat();

  //handle childs
  for (const child of childs) {
    const awaitedChild: unknown = await child;

    //string or number
    if (typeof awaitedChild === "string" || typeof awaitedChild === "number") {
      el.innerText += awaitedChild;
      continue;
    }

    //Dom element
    if (awaitedChild instanceof Element) {
      el.appendChild(awaitedChild);
      continue;
    }
  }

  return el;
}
