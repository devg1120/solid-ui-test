import { createEffect, onCleanup, createSignal, onMount } from "solid-js";

export default function CountUp({ countTo }) {
  const [count, setCount] = createSignal(0);
  let intervalRef = null;

  onMount(() => {
    // Increment the count every 50ms
    intervalRef = setInterval(() => {
      if (count() < countTo) {
        setCount(count() + 6);
      } else {
        clearInterval(intervalRef);
      }
    }, 50);

    onCleanup(() => {
      clearInterval(intervalRef);
    });
  });

  return <span class="is-size-1">{count()}</span>;
}
