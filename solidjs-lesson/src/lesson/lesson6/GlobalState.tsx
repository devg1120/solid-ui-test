import { useContext,createSignal,createMemo } from 'solid-js';
import { createStore,produce } from 'solid-js/store';
import { Route, Router } from '@solidjs/router';
import  Cart from './pages/Cart';
import  Products from './pages/Products';
import  Articles from './pages/Articles';
import  Details from './pages/Details';
import { ShopContext } from './pages/ShopContext';
import {shopReducer } from './Reducer';
const GlobalState = () => {
	const [cnt,setCnt] = createStore({cart:0,articles:0});
	const ctx = useContext(ShopContext);
	const [store,setStore] = createStore(ctx);
	const dispatch = (mode,data)=>{
		setStore(produce((store)=> shopReducer(mode,data,store)));
	}
	const itemsCounter = (items)=>{
			return items.reduce((count,artItem)=>{
				return count + artItem.quantity //購入の個数
			},0);
	}
	createMemo(()=>{
		setCnt(
			produce((cnt)=>{
				cnt.cart = itemsCounter(store.cart);
				cnt.articles = itemsCounter(store.articles);
			})
		)
	})		
    return (
		<>
			<ShopContext.Provider value={{store:store,dispatch:dispatch}}>
			<div class="tab-a-base">
			<header class="main-navigation">
				<nav>
					<ul>
						<li><a href="/Cart">Cart（{cnt.cart}）</a></li>
						<li><a href="/Products">Products（{cnt.articles}）</a></li>
					</ul>
				</nav>
			</header>
			</div>
			<Router>
				<Route path="/Cart" component={Cart} />
				<Route path="/Products" component={Products} />
				<Route path="/Articles" component={Articles} />
				<Route path="/Details" component={Details} />
			</Router>
			</ShopContext.Provider>
		</>
    );
};

export default GlobalState;


