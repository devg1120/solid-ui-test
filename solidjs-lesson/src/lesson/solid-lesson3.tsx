import type { Component } from 'solid-js';
import {createSignal,createEffect,For } from 'solid-js';

import Table from "./table";
import CodeView from "./code_view";


let code = `
import type { Component } from 'solid-js';
import {createSignal,createEffect,For } from 'solid-js';

const App =()=>{
	//変数定義
	const [word$,setWord] = createSignal(""); //検索文字の制御
	const [searched$ ,setSearched] = createSignal([]); //検索結果の制御
	const ary_data = [
		{id: 1,name: "モスクワ",img:"Moscow.jpg"},
		{id: 2,name: "サンクトペテルブルク",img:"Sankt.jpg"},
		{id: 3,name: "エカテリンブルク",img:"Yekaterin.jpg"},
		{id: 4,name: "ムンバイ",img:"Mumbai.jpg"},
		{id: 5,name: "ベンガルール",img:"Bengaluru.jpg"},
		{id: 6,name: "コルカタ",img:"Kolkata.jpg"},
		{id: 7,name: "サンパウロ",img:"SaoPaulo.jpg"},
		{id: 8,name: "リオデジャネイロ",img:"Rio.jpg"},
		{id: 9,name: "ブラジリア",img:"Brasilia.jpg"},
	];
	//createEffectフックによって、検索値がバインドされたときに処理が実行される
	createEffect( ()=>{
		let searched = []
		if(word$() != ""){
			searched = ary_data.filter((item,idx)=>{
				return item.name.search(word$())!== -1;
			});
		}
		setSearched(searched);
	});
	//検索文字のバインド
	const bindWord = (e)=>{
		let word = e.target.value
		word = word.replace(/[\u3041-\u3096]/g, function(match) {
			let chr = match.charCodeAt(0) + 0x60;
			return String.fromCharCode(chr);
		})
        setWord(word); //検索文字のバインド
	}
    //検索文字のクリア
	const clear = ()=>{
	    let word = ''
		setWord(word);
	}
	//レンダリング
	return(
		<>
		<input type="text" onInput={bindWord} value={word$()} />
		<p>検索結果{searched$().length}件</p>
		<button onClick={ clear }>文字のクリア</button>
		<ul>
		<For each={searched$()}>
		{(data,index)=>(
			<li>
				<dl>
					<dt>{ data?.name }</dt>
					<dd >image</dd>
				</dl>
			</li>
		)}
		</For>
		</ul>
		</>
	);
}
export default App;

`;



const App: Component = () => {

	const [word$,setWord] = createSignal(""); //検索文字の制御
	const [searched$ ,setSearched] = createSignal([]); //検索結果の制御
        const columns = [ "id", "name", "img"];
	const rows = [
		{id: 1,name: "モスクワ",img:"Moscow.jpg"},
		{id: 2,name: "サンクトペテルブルク",img:"Sankt.jpg"},
		{id: 3,name: "エカテリンブルク",img:"Yekaterin.jpg"},
		{id: 4,name: "ムンバイ",img:"Mumbai.jpg"},
		{id: 5,name: "ベンガルール",img:"Bengaluru.jpg"},
		{id: 6,name: "コルカタ",img:"Kolkata.jpg"},
		{id: 7,name: "サンパウロ",img:"SaoPaulo.jpg"},
		{id: 8,name: "リオデジャネイロ",img:"Rio.jpg"},
		{id: 9,name: "ブラジリア",img:"Brasilia.jpg"},
	];
	createEffect( ()=>{
		let searched = []
		if(word$() != ""){
			searched = rows.filter((item,idx)=>{
				return item.name.search(word$())!== -1;
			});
		}
		setSearched(searched);
	});
	const bindWord = (e)=>{
		let word = e.target.value
		word = word.replace(/[\u3041-\u3096]/g, function(match) {
			let chr = match.charCodeAt(0) + 0x60;
			return String.fromCharCode(chr);
		})
        setWord(word); //検索文字のバインド
	}
	const clear = ()=>{
	    let word = ''
		setWord(word);
	}
	return (
	<>
    	    <div>
	        <Table columns={columns} rows={rows} />
		<br/>
		<input type="text" onInput={bindWord} value={word$()} />
		<p>検索結果{searched$().length}件</p>
		<button onClick={ clear }>文字のクリア</button>
		<ul>
		<For each={searched$()}>
		{(data,index)=>(
			<li>
				<dl>
					<dt>{ data?.name }</dt>
				</dl>
			</li>
		)}
		</For>
		</ul>
    	    </div>
	    <CodeView code={code}/>
	</>
	);
};

export default App;


