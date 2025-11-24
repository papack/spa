import { render, h } from "../../src";

render(<MyComponent />, document.getElementById("root")!);

async function MyComponent() {
  return (
    <ul>
      <li>a</li>
      <li>b</li>
      <li>c</li>
      <li>d</li>
    </ul>
  );
}
