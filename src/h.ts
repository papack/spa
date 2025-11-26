import type { ChildType } from "./child";
import type { PropsType } from "./props";
import type { ReadFn } from "./signal";

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
    if (
      typeof awaitedChild === "function" &&
      (awaitedChild as any).type === "signal"
    ) {
      const signalChild = awaitedChild as ReadFn<unknown>;
      await signalChild(async (v) => {
        if (el instanceof HTMLElement) {
          el.innerText = String(v);
          return;
        }
        throw "svg not implemented with signal yet";
      });
      continue;
    }

    //string or number
    if (typeof awaitedChild === "string" || typeof awaitedChild === "number") {
      if (el instanceof HTMLElement) {
        el.innerText += awaitedChild;
        continue;
      }
      throw "svg not implemented with number and string";
    }

    //Dom element
    if (awaitedChild instanceof Element) {
      el.appendChild(awaitedChild);
      continue;
    }

    throw "signal not implemented yet!";
  }
}
