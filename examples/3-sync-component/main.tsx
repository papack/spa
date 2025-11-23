import { render, h } from "../../src";

render(<MyComponent />, document.getElementById("root")!);

function MyComponent() {
  return <div>Hello from Component!</div>;
}
