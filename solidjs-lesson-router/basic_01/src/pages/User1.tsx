//import { onCleanup, createSignal } from "solid-js";
//import { render } from "solid-js/web";
import { useParams } from "@solidjs/router";

export default  function Component(props)  {
  const params = useParams(); // params.id で値を取得

  console.log("params:",params);
  return <div>User ... id => {params.id}</div>;
};


