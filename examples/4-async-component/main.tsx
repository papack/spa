import { render, jsx } from "../../core";

render(<MyComponent />, document.getElementById("root")!);

async function MyComponent() {
  const s = await new Promise((res) => {
    setTimeout(() => {
      res("Component");
    }, 2_000);
  });

  return <div>Hello from {s} </div>;
}
