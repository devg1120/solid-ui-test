
import { For,useContext } from "solid-js";
import { Link } from '@solidjs/router';
import { ShopContext } from './ShopContext';
import '../Cart.css';

const ProductsPage = props =>{
	const ctx = useContext(ShopContext);
	return(
				<>
					<main className="products">
						<ul>
							<For each={ctx.store.products}>
								{(product,idx)=>(
									<>
									<li>
										<div>
											<strong><a href={`./Details/${product.id}`}>{product.title}</a></strong> - {product.price}円  【残り{product.stock}個】
										</div>
										<div>
										{product.stock > 0 && <button onClick={()=>ctx.dispatch("add",product)}>かごに入れる</button>}
										</div>
									</li>
									</>
								)}
							</For>
						</ul>
					</main>
				</>
	)
}
export default ProductsPage


