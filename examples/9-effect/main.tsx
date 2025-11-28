import { render, jsx, fragment, signal, time, effect } from "../../core";

render(<MyComponent />, document.getElementById("root")!);

async function MyComponent() {
  const [value, setValue] = signal(0);
  const [conent, setContent] = signal("");
  effect(value, async (v) => {
    await setContent(() => `value is ${v}`);
  });

  setInterval(() => {
    setValue((prev) => prev + 1);
  }, time.SECOND);

  return (
    <>
      <div>{conent}</div>
    </>
  );
}
