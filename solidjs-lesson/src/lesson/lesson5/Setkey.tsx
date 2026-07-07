import { For,onMount } from "solid-js";
import { createStore } from "solid-js/store";
const Setkey = (props)=>{
	const[ state, setState ] = createStore([]); //文字列
    const pushkeys = props.pushkeys; //親コンポーネントからの受け渡し
    const onEmit = props.onEmit; //親コンポーネントからの受け渡し
  	const fstate = {
		lnum: null, //被序数
		cnum: 0, //序数
		sign: "",
	};
	//ステータスの設定
	onMount(()=>{
		setState(fstate);
	})
    //プッシュキーのイベントメソッド
	const getChar = (chr,str)=>{
		let lnum = state.lnum;　//被序数
		let cnum = state.cnum; //序数
		let sign = state.sign; //計算記号
		let sum = 0 //合計
		if(chr.match(/[0-9]/g)!== null){
			let num = parseInt(chr)
			cnum = cnum * 10 + num //数値が打ち込まれるごとに桁をずらしていく
		}else if(chr.match(/(c|eq)/g) == null){
			if(lnum != null){
				lnum = calc(sign,lnum,cnum)
			}else{
				if(chr == "sub"){
					lnum = 0
				}
				lnum = cnum
			}
			sign = chr
			cnum = 0
		}else if( chr == "eq"){
			lnum = calc(sign,lnum,cnum)
			sum = lnum
		}else{
			lnum = null
			cnum = 0
			sum = 0
		}
        setState({lnum,cnum,sign}) //変数の同期用
        onEmit(str,sum); //親コンポーネントへの送出
	}
		
	//計算処理
	const calc = (mode,lnum,cnum)=>{
		switch(mode){
			case "add": lnum = cnum + lnum
			break;
			case "sub": lnum = lnum - cnum
			break;
			case "mul": lnum = lnum * cnum
			break;
			case "div": lnum = lnum / cnum
			break;
		}
		return lnum
	}
  return (
      <>
  		<For each={pushkeys}>
			{(val,key)=>(
				<div>
					<For each={val}>
						{(v,i)=>(
	                        <button class="square" onClick={()=>{getChar(v[0],v[1])}}>
		                    {v[1]}
	                        </button>						
						)}
					</For>
				</div>
			)}
		</For>
    </>

  )
}
export default Setkey;
