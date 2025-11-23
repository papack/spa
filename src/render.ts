export async function render(child: Promise<Element>, container: HTMLElement) {
  const awaitedChild = await child;
  container.appendChild(awaitedChild);
}
