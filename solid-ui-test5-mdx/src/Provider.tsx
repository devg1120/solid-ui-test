//import { MDXProvider } from 'solid-jsx';

//import  Tweet  from './Tweet.mdx';
import  { Counter }  from './Counter'; 
import  Tweet from './Tweet.mdx'; 

import Greeting from './Greeting.mdx';


export function Provider() {

const components = {
       //h1: (props) => <h1 style={{ color: 'royalblue' }} {...props} />,
       //h2: (props) => <h1 style={{ color: 'red' }} {...props} />,
       //p: (props) => <p style={{ color: "green", "font-size": '40px' }} {...props} />,
       Counter,
       Tweet
  }

const components2 = {
       h1: (props) => <h1 style={{ color: 'royalblue' }} {...props} />,
       h2: (props) => <h1 style={{ color: 'red' }} {...props} />,
       p: (props) => <p style={{ color: "green", "font-size": '40px' }} {...props} />,
       Counter: Counter,
       Tweet: Tweet
  }

// 生成されたHTMLで使用するコンポーネント
function H1(props: {children?: ReactNode}) {
  return <h1 className="text-blue-600 text-2xl font-bold">{props.children}</h1>
}

function P(props: {children?: ReactNode}) {
  return <p className="p-3">{props.children}</p>
}

function Li(props: {children?: ReactNode}) {
  return <li className="px-6 py-1 list-item list-outside drop-shadow-lg">🏄 {props.children}</li>
}

const components3 = {
  h1: H1,
  p: P,
  li: Li,
       Counter: Counter,
       Tweet: Tweet
}


return (
    <Greeting name="syo" components={components}/>
)


/*
return (
  <MDXProvider components={components}>
    <Greeting name="syo" />
  </MDXProvider>
)
*/




}
