export async function render(
  childs: Promise<Element> | Promise<Element>[],
  container: HTMLElement
) {
  for (const child of Array.isArray(childs) ? childs : [childs]) {
    const awaitedChild = await child;
    container.appendChild(awaitedChild);
  }
}
