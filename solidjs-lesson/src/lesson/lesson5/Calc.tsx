import { createSignal } from "solid-js";
import Setkey from "./Setkey";


const Calc = ()=>{
    const [str,setStr] = createSignal("");
    const [sum,setSum] = createSignal(0);
	const pushkeys = [
		[['7','7'],['8','8'],['9','9'],['div','÷']],
		[['4','4'],['5','5'],['6','6'],['mul','×']],
		[['1','1'],['2','2'],['3','3'],['sub','-']],
		[['0','0'],['eq','='],['c','C'],['add','+']],
	];
    //子コンポーネントからの値の受取
    const onReceive = (typed,sum)=>{
        setStr(str() + typed);
        setSum(sum);
    }
	return (
			<>
                <Setkey pushkeys={pushkeys} onEmit={(c,s)=>onReceive(c,s)} />
				<div>
					<p>打ち込んだ文字:{str}</p>
					<p>合計:{sum}</p>
				</div>
			</>
	)
}

export default Calc;

