import type { Component } from 'solid-js';
import {createSignal } from 'solid-js';
import CodeView from "./code_view";


let code = `
import type { Component } from 'solid-js';
import {createSignal } from 'solid-js';

const App: Component = () => {
        const [mes,setMes] = createSignal(null)
        const changeMes= (e)=>{
                setMes(e.target.value);
        }
        return (
        <div>
                <input onInput={changeMes} />
                <p>入力された文字<span>{mes() }</span></p>
        </div>
        );
};

export default App;
`;



const App: Component = () => {
	const [mes,setMes] = createSignal(null)
	const changeMes= (e)=>{
		setMes(e.target.value);
	}

	return (
	<>
    	    <div>
    		<input onInput={changeMes} />
    		<p>入力された文字<span>{mes() }</span></p>
    	    </div>
	    <CodeView code={code}/>
	</>
	);
};

export default App;


