import { render, jsx, fragment, signal, time } from "../../core";

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
