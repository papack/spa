export async function render(
  childs: Promise<Element> | Promise<Element>[],
  container: HTMLElement
) {
  for (const child of Array.isArray(childs) ? childs : [childs]) {
    const awaitedChild = await child;

    //dont render empty things
    if (awaitedChild === null || awaitedChild === undefined) {
      continue;
    }

    //render arrays recusively
    if (Array.isArray(awaitedChild)) {
      await render(awaitedChild, container);
      continue;
    }

    //append to container
    container.appendChild(awaitedChild);
  }
}
