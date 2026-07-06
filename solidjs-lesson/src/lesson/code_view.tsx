import type { Component } from 'solid-js';
import {createSignal } from 'solid-js';
import { onMount } from "solid-js";
import hljs from "highlight.js";
//import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";



const App: Component = (props) => {
      let ref_ = null;

       onMount(() => {
         if (ref_) {
           hljs.highlightElement(ref_);
         }
       });

	const [mes,setMes] = createSignal(null)
	const changeMes= (e)=>{
		setMes(e.target.value);
	}

	return (
	<>
	   <pre  style = {{ height: "200px", "overflow-y": "scroll"}}>
            <code ref={ref_} class="typescript">
              {props.code}
            </code>
           </pre>
	</>
	);
};

export default App;


