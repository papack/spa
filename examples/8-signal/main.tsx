import { render, h, fragment, signal, time } from "../../src";

render(<MyComponent />, document.getElementById("root")!);

async function MyComponent() {
  const [value, setValue] = signal(0);

  setInterval(() => {
    setValue((prev) => prev + 1);
  }, time.SECOND);

  return (
    <>
      <div>{value}</div>
    </>
  );
}
