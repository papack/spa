import { render, jsx, fragment } from "../../core";

render(<MyComponent />, document.getElementById("root")!);

async function MyComponent() {
  return (
    <>
      <div>1</div>
      <div>2</div>
    </>
  );
}
