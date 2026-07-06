import type { Component } from 'solid-js';
import { For, createSignal } from 'solid-js';
import CodeView from "./code_view";


let code = `
import {For } from 'solid-js'; //ここからForを呼び出す

const App =()=>{
	//変数定義
	const [sel,setMenu] = createSignal("");
	const ary_data = [
		{id: 1,name: "cakePHP"},
		{id: 2,name: "Laravel"},
		{id: 3,name: "Code Igniter"},
		{id: 4,name: "Symfony"},
		{id: 5,name: "Zend Framework"},
		{id: 6,name: "Yii"},
	];
   //イベント処理
	const changeMenu = (e)=>{
		setMenu(e.target.value ); //フォームから取得した値
	}
	//レンダリング
	return(
		<>
		<select onChange={changeMenu}>
			<option>選択</option>
			<For each={ary_data}>
            {(data,idx)=>(
                <option value={data.id}>{data.name}</option>>
            )}
            </For>
		</select>
		<p>選択された値:<span>{sel}</span></p>
		</>
	);
}
export default App;

`;



const App: Component = () => {
	const [sel,setMenu] = createSignal("");
	const ary_data = [
		{id: 1,name: "cakePHP"},
		{id: 2,name: "Laravel"},
		{id: 3,name: "Code Igniter"},
		{id: 4,name: "Symfony"},
		{id: 5,name: "Zend Framework"},
		{id: 6,name: "Yii"},
	];

	const changeMenu = (e)=>{
		setMenu(e.target.value ); //フォームから取得した値
	}
	
	return (
	<>
    	    <div>
		<select onChange={changeMenu}>
			<option>選択</option>
			<For each={ary_data}>
                          {(data,idx)=>(
                              <option value={data.id}>{data.name}</option>
                          )}
                        </For>
		</select>
		<p>選択された値:<span>{sel}</span></p>
    	    </div>
	    <CodeView code={code}/>
	</>
	);
};

export default App;


