import type { ChildType } from "./child";
import type { PropsType } from "./props";

export async function h(
  tag: string | ((props: any, childs: any) => Promise<Element>),
  props: PropsType,
  ...childs: ChildType[]
): Promise<Element> {
  //call component
  if (typeof tag == "function") {
    return await tag(props, childs);
  }

  //create element
  const el = document.createElement(tag);

  //no childs
  if (childs.length === 0) {
    return el;
  }

  //this will create all childs. It can be recursive so its in a
  //extra function
  await born(childs, el);

  return el;
}

async function born(childs: ChildType[], el: Element) {
  //handle childs
  for (const child of childs) {
    const awaitedChild: unknown = await child;

    //dont handle empty things
    if (awaitedChild === null || awaitedChild === undefined) {
      continue;
    }

    //child consist out of childs. Born the childs
    if (Array.isArray(awaitedChild)) {
      if (awaitedChild.length === 0) continue;
      await born(awaitedChild, el);
      continue;
    }

    //signal
    if (typeof awaitedChild === "function") {
      throw "signal not implemented yet!";
      //TODO: mount signal
    }

    //string or number
    if (typeof awaitedChild === "string" || typeof awaitedChild === "number") {
      if (el instanceof HTMLElement) {
        el.innerText += awaitedChild;
      }
      continue;
    }

    //Dom element
    if (awaitedChild instanceof Element) {
      el.appendChild(awaitedChild);
      continue;
    }
  }
}
