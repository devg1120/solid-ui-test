
const addProductToCart = (product, state) => {
	let cartIndex = null
	const stat = state
	//買い物かごの調整
	const updatedCart = [...stat.cart];
	const updatedItemIndex = updatedCart.findIndex(
	item => item.id === product.id
	);
	if (updatedItemIndex < 0) {
	updatedCart.push({ ...product, quantity: 1,stock: 0 });
		cartIndex = updatedCart.length -1 //カートの最後尾
	} else {
	const updatedItem = { ...updatedCart[updatedItemIndex] }
	updatedItem.quantity++;
	updatedCart[updatedItemIndex] = updatedItem;
		cartIndex = updatedItemIndex　//加算対象のインデックス
	}
	//商品在庫の調整
	const updatedProducts = [...stat.products] //商品情報
	const productid = updatedCart[cartIndex].id //在庫減算対象の商品
	const productIndex = updatedProducts.findIndex(
		p => productid === p.id
	)
	const tmpProduct = { ...updatedProducts[productIndex] }
	tmpProduct.stock-- //在庫の減算
	updatedProducts[productIndex] = tmpProduct
	//合計金額の調整
	const total = stat.total
	const sum = getSummary(updatedCart,total)
	stat.cart = updatedCart
	stat.products = updatedProducts
	stat.total = sum
};

//カートから商品の返却
const removeProductFromCart = (productId, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(item => item.id === productId);
  const updatedItem = { ...updatedCart[updatedItemIndex] }
  updatedItem.quantity--
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }
	//商品在庫の調整
	const updatedProducts = [...state.products] //商品情報
	const productIndex = updatedProducts.findIndex(
		p => p.id === productId
	)
	const tmpProduct = { ...updatedProducts[productIndex] }
	tmpProduct.stock++ //在庫の加算
	updatedProducts[productIndex] = tmpProduct
	let summary = getSummary(updatedCart,state.total)
	state.total = summary;
	state.cart =  updatedCart;
	state.products = updatedProducts;
};

//購入手続
const buyIt = (state)=>{
	let cart = [...state.cart];
	let money = state.money
	let total = state.total
	let articles = state.articles; //所持品

	for( let val of cart){
		const articlesIndex = articles.findIndex(
			a => a.id === cart.id
		)
		if (articlesIndex < 0) {
			articles = [...state.cart];
		} else {
			const tmpArticles = { ...articles[articlesIndex] }
			tmpArticles.quantity++;
			articles[articlesIndex] = tmpArticles;
		}
	}
	let summary = getSummary(cart,total)
	let rest = money - summary
	cart.splice(0)
	summary = 0
	state.total =  summary;
	state.money = rest;
	state.cart =  cart;
	state.articles = articles;
}

const getSummary = (cart,total)=>{
	const sum = cart.reduce((total,{price = 0,quantity})=> total + price * quantity,0)
	return sum
}


export const shopReducer = (mode, data,store) => {
	switch (mode) {
		case "add":
		  return addProductToCart(data,store);
		case "remove":
		  return removeProductFromCart(data,store);
		case "buy":
		  return buyIt(store);
		default:
		  return store;
	}
};


