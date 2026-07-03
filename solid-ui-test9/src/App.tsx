import { createSignal } from 'solid-js'

import solidLogo from './assets/solid.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

//import './github-markdown-css/github-markdown.css'

//import './github-markdown-css/github-markdown-dark.css'
//import './github-markdown-css/github-markdown-dark-colorblind.css'
//import './github-markdown-css/github-markdown-dark-high-contrast.css'

import './github-markdown-css/github-markdown-light.css'
//import './github-markdown-css/github-markdown-light-colorblind.css'

//import './gfm.css/gfm.css'
//import './gfm-stylesheet/dist/gfm.css'


//import { Button } from "~/components/ui/button"

import { Element as Button } from "~/examples/Button"
import { Element as Accordion } from "~/examples/Accordion"
import { LineChartDemo, PieChartDemo, BarChartDemo } from "~/examples/Charts"
import { CardDemo } from "~/examples/Card"
import { ResizableDemo } from "~/examples/Resizable"
import { TableDemo } from "~/examples/Table"
import { TabsDemo } from "~/examples/Tabs"


import Greeting from './Greeting.mdx';
//import MDX from "~/examples/Accordion/accordion.mdx"

import  { Provider } from './Provider';
import Sample1 from './markdown/sample1.mdx';
import Sample2 from './markdown/sample2.mdx';



function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>

    <br/> <h1> MDX  </h1>     
    <hr style="height: 5px; background-color: gray; "/>

{/*
    <div class="p-8">
      <Greeting name="gusa"/>
    </div>
    <br/>
*/}
 
    <div class="p-8">
      <Provider/>
    </div>

{/*
    <Sample1/>
*/}


    <div class="markdown-body" style={{padding: "40px"}}>
       <Sample1/>
    </div>


    <hr style="height: 5px; background-color: gray; "/>
    
    <br/> <h1> Button   </h1>     

      <div style={{padding: "30px",width:"800px"}}>
        <Button/>
      </div>

    <br/> <h1> Accordion</h1>     
      <div style={{padding: "30px",width:"300px"}}>
        <Accordion/>
      </div>

    <br/> <h1>Charts</h1>
      <h3>LineChartDemo</h3>
       <LineChartDemo/>
      <h3>PieChartDemo</h3>
       <PieChartDemo/>
      <h3>BarChartDemo</h3>
       <BarChartDemo/>

    <br/> <h1>Card</h1>
       <CardDemo/>


    <br/> <h1>Resizable</h1>
       <ResizableDemo/>

    <br/> <h1>Table</h1>
       <TableDemo/>

    <br/> <h1>Tabs</h1>
       <TabsDemo/>

{/*
    <MDX/>
*/}
    </>
  )
}

export default App
