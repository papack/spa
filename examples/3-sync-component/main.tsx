import { render, jsx } from "../../core";

render(<MyComponent />, document.getElementById("root")!);

function MyComponent() {
  return <div>Hello from Component!</div>;
}
