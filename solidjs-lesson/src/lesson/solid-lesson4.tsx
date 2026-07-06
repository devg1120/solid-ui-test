import type { Component } from 'solid-js';
import {createSignal,onMount, Index } from 'solid-js';

import Table from "./table";
import CodeView from "./code_view";


let code = `
import type { Component } from 'solid-js';
import {createSignal,onMount, Index } from 'solid-js';

const App =()=>{
    //変数定義
	const [item$, setItem] = createSignal('');
    const [bind$ ,setBind] = createSignal([]); //フックの使用（データリストの更新）
    const	ary_data = [
        {id: 1,name: "モスクワ"},
        {id: 2,name: "サンクトペテルブルク"},
        {id: 3,name: "エカテリンブルク"},
        {id: 4,name: "ムンバイ"},
        {id: 5,name: "ベンガルール"},
        {id: 6,name: "コルカタ"},
        {id: 7,name: "サンパウロ"},
        {id: 8,name: "リオデジャネイロ"},
        {id: 9,name: "ブラジリア"},
		];
    //新規作成用のメソッド
	const ins = ()=>{
			setBind([
				...bind$(),
			{
				id:  bind$().length + 1,
				name: item$()
			}
			]) //新規作成
	}
    //削除用のメソッド
	const del = (idx)=>{
			setBind(bind$().filter((_, i) => i !== idx)) //削除処理
	}
	//修正用のメソッド
	const upd = (idx,name)=>{
		changeValue(idx,name)
	}
	const changeValue = (idx,item)=>{
		let edit = []
		bind$().map((elem,i)=>{
			if(i !== idx){
				edit = [...edit,elem]
			}else{
				edit =  [...edit,{id:i + 1, name: item}]
			}
		})
		setBind(edit)
	}
    //onMountを用いると、一回だけ読み込む処理ができる
    onMount( ()=>{
		setBind(ary_data) //空オブジェクトに代入
    });
    //レンダリング
    return(
        <>
			<label>新規<input type="text"  onInput={ (e)=>{ setItem(e.target.value) } } value={item$()}/></label>
			<button type="button" onClick={ ins }>新規</button>
			<ul>
				<Index each={bind$()}>
					{(data,idx)=>(
						<li>
							<dl>
								<dt><input type="text" onChange={ (e)=>{ changeValue(idx,e.target.value) } } value={ data().name } /></dt>
								<dd><button type="button" onClick={ ()=> upd(idx,data().name) }>修正</button></dd>
								<dd ><button type="button" onClick={ ()=> del(idx) }>削除</button></dd>
							</dl>
						</li>
					)}
				</Index>
			</ul>
        </>
    );
}
export default App;


`;



const App: Component = () => {

	const [item$, setItem] = createSignal('');
        const [bind$ ,setBind] = createSignal([]); //フックの使用（データリストの更新）
        const columns = [ "id", "name", ];
	const rows = [
        {id: 1,name: "モスクワ"},
        {id: 2,name: "サンクトペテルブルク"},
        {id: 3,name: "エカテリンブルク"},
        {id: 4,name: "ムンバイ"},
        {id: 5,name: "ベンガルール"},
        {id: 6,name: "コルカタ"},
        {id: 7,name: "サンパウロ"},
        {id: 8,name: "リオデジャネイロ"},
        {id: 9,name: "ブラジリア"},
	];

	const ins = ()=>{
			setBind([
				...bind$(),
			{
				id:  bind$().length + 1,
				name: item$()
			}
			]) //新規作成
	}
    //削除用のメソッド
	const del = (idx)=>{
			setBind(bind$().filter((_, i) => i !== idx)) //削除処理
	}
	//修正用のメソッド
	const upd = (idx,name)=>{
		changeValue(idx,name)
	}
	const changeValue = (idx,item)=>{
		let edit = []
		bind$().map((elem,i)=>{
			if(i !== idx){
				edit = [...edit,elem]
			}else{
				edit =  [...edit,{id:i + 1, name: item}]
			}
		})
		setBind(edit)
	}		
    //onMountを用いると、一回だけ読み込む処理ができる
    onMount( ()=>{
		setBind(rows) //空オブジェクトに代入
    });

	return (
	<>
    	    <div>
	        <Table columns={columns} rows={bind$()} />
		<br/>
			<label>新規<input type="text"  onInput={ (e)=>{ setItem(e.target.value) } } value={item$()}/></label>
			<button type="button" onClick={ ins }>新規</button>
			<ul>
				<Index each={bind$()}>
					{(data,idx)=>(
						<li style={{ "list-style": "none"}}  >
							<dl style={{ "display": "flex"}}>
							        <dt style = {{ "padding-right": "15px" }}>{bind$()[idx].id}  </dt>
								<dt><input type="text" onChange={ (e)=>{ changeValue(idx,e.target.value) } } value={ data().name } /></dt>
								<dd><button type="button" onClick={ ()=> upd(idx,data().name) }>修正</button></dd>								
								<dd ><button type="button" onClick={ ()=> del(idx) }>削除</button></dd>
							</dl>
						</li>
					)}
				</Index>
			</ul>
    	    </div>
	    <CodeView code={code}/>
	</>
	);
};

export default App;


