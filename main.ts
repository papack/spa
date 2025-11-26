import { effect } from "./effect";
import { signal } from "./signal";

//der call von in diesem fall "count" muss in die h function!!!
//in jsx wird nur die ref genutzt.. nicht gecalled!!
//eg <div>{count}</div>

const [count, setCount] = signal(0);
const [list, setList] = signal<number[]>([]);
//effect  später auch sowas ermöglichen
// <Button variant={effect(count, async(v)=> count %2 ? "blue" : "red")}}/>
//eventuell mit einen Wrapper in der h function, der nochmal um das ergebnis von dem
//effect gelegt wird?
await effect(count, async (v) => {
  console.log("eff run", v);
  //stop the immutable maddnes
  await setList((list) => {
    list.push(v);
    return list;
  });
});

//some experiment how this could be possible
// <Button variant={effect(count, async(v)=> count %2 ? "blue" : "red")}}/>
const { result, repeat } = await effect(count, async (value) => {
  return `the value is ${value}`;
});
console.log(result);

//just for test
setInterval(async () => {
  //setcount call directly
  setCount((prev) => prev + 1);
}, 1_000);

//exmaple (braucht man evtl in der h fn zum erkennen, das es ein signal ist)
count.type === "readfn";

//hier wird später nur der handler der fn übergeben an
// eine h fn übergeben.
count(async (value) => {
  //hier wird später das dom element angepasst
  console.log(value);
});

effect(list, async (list) => {
  console.log(list.join(","));
  console.log(await repeat());
});
