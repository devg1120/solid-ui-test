import { createSignal, mergeProps } from 'solid-js';

//  const [count, setCount] = createSignal(1); 

export function Counter(props) {
  const merged = mergeProps({ width: "150px", color: "lightgray" }, props);

  const [count, setCount] = createSignal(1); 

  const handler = (data, event) => {
    console.log("handler",count());
    setCount(count() + 1)
    console.log(count());
  }

  return (
        <button
          type="button"
          class="counter"
	  onClick={[handler]}
	  style={{width:merged.width, "background-color": merged.color}}
	  style={{margin:"4px"}}
        >
          Count is : {count()}
        </button>
  );
}


