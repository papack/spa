import { render, h, fragment } from "../../src";

render(<MyComponent />, document.getElementById("root")!);

async function MyComponent() {
  return (
    <>
      <div>1</div>
      <div>
        <>
          <MySecondComponent />
          <MySecondComponent />
        </>
      </div>
    </>
  );
}

async function MySecondComponent() {
  return (
    <>
      <div>a</div>
      <div>b</div>
    </>
  );
}
