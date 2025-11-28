import type { ChildType } from "./child";
import { type EffectFn } from "./effect";
import type { PropsType } from "./props";
import type { ReadFn } from "./signal";

export async function jsx(
  tag: string | ((props: any, childs: any) => Promise<Element>),
  props: PropsType,
  ...childs: ChildType[]
): Promise<Element> {
  if (typeof tag === "function") return await tag(props, childs);

  const el = document.createElement(tag);

  if (childs.length) await born(childs, el);
  return el;
}

async function born(childs: ChildType[], el: Element) {
  for (const child of childs) {
    const awaited = await child;

    if (awaited == null) continue;
    if (Array.isArray(awaited)) {
      if (awaited.length) await born(awaited, el);
      continue;
    }

    if (isSignal(awaited)) {
      await handleSignal(el, awaited);
      continue;
    }

    if (isEffect(awaited)) {
      handleEffect(el, awaited);
      continue;
    }

    if (typeof awaited === "string" || typeof awaited === "number") {
      appendText(el, awaited);
      continue;
    }

    if (awaited instanceof Element) {
      el.appendChild(awaited);
      continue;
    }

    throw "unknown child type";
  }
}

function isSignal(v: any): v is ReadFn<unknown> {
  return typeof v === "function" && v?.type === "signal";
}

function isEffect(v: any): v is EffectFn<unknown> {
  return typeof v === "object" && v?.type === "effect";
}

async function handleSignal(el: Element, signal: ReadFn<unknown>) {
  if (!(el instanceof HTMLElement)) throw "svg not implemented with signal yet";

  await signal(async (v) => {
    changeText(el, String(v));
  });
}

function handleEffect(el: Element, effect: EffectFn<unknown>) {
  if (!(el instanceof HTMLElement)) throw "svg not implemented with signal yet";

  appendText(el, String(effect.result));
  effect.addHook((next) => changeText(el, String(next)));
}

function changeText(el: Element, value: string | number) {
  if (el instanceof HTMLElement) {
    el.innerText = String(value);
  } else {
    throw "svg not implemented with number and string";
  }
}

function appendText(el: Element, value: string | number) {
  if (el instanceof HTMLElement) {
    el.innerText += String(value);
  } else {
    throw "svg not implemented with number and string";
  }
}
