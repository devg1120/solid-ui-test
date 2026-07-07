import { For,Show,useContext } from "solid-js";
import { ShopContext } from './ShopContext';
import '../Cart.css';

const Cart = ()=>{
	const ctx = useContext(ShopContext); //受け取ったcontextオブジェクト
	return(
		<>
			<main class="cart" >
			<Show when={ctx.store.cart?.length <= 0}>
				<p>No Item in the Cart!</p>
			</Show>
			<ul>
			<For each={ctx.store.cart}>
				{(cartitem,i)=>(
					  <li>
						<div>
						  <strong>{ cartitem.title }</strong> - { cartitem.price }円
						  ({ cartitem.quantity })
						</div>
						<div>
						  <button onClick={()=>ctx.dispatch("remove",cartitem.id)}>買い物かごから戻す（1個ずつ）</button>
						</div>
					  </li>
				)}
			</For>
			</ul>
			<h3>合計: {ctx.store.total}円</h3>
			<h3>残高: {ctx.store.money}円</h3>
			<Show when={ctx.store.money - ctx.store.total >= 0} >
				<button onClick={()=>ctx.dispatch("buy",null)}>購入</button>
			</Show>
			</main>
		</>
	)
}
export default Cart;


