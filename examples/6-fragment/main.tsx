import { render, h, fragment } from "../../src";

render(<MyComponent />, document.getElementById("root")!);

async function MyComponent() {
  return (
    <>
      <div>1</div>
      <div>2</div>
    </>
  );
}
