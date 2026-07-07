
import { useContext } from "solid-js";
import { ShopContext } from './ShopContext';
import { Route, Router,useParams,useSearchParams, useNavigate } from '@solidjs/router';

const Details = ()=>{
	const ctx = useContext(ShopContext);
	const { id } = useParams() //useParamsはパスをそのまま抽出できる
	//const [query,setQuery] = useSearchParams(); //useSearchParamsはクエリをオブジェクトとして取得できる

	const navigate = useNavigate();
    //カスタムコンポーネント作成し、そこで準備する
	const ShowItem = ()=>{
		const selid = `${query.id}` //取得したパラメータを検索用idに修正
		const item = ctx.store.products.find((item)=> item.id == selid) //一致するアイテム取得
		return(
				<li>{item.title}</li>
		)
	}
	return(
		<>
			<ul>
				<ShowItem />
			</ul>
			<button onClick={()=>navigate('/Products')}>戻る</button>
		</>
	)
}
export default Details;


