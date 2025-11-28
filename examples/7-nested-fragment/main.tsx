import { render, jsx, fragment } from "../../core";

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
