import { createSignal } from 'solid-js'

import solidLogo from './assets/solid.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

//import { Button } from "~/components/ui/button"

import { Element as Button } from "~/examples/Button"
import { Element as Accordion } from "~/examples/Accordion"


import Greeting from './Greeting.mdx';
import MDX from "~/examples/Accordion/accordion.mdx"


function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>

    <br/> <h1> MDX  </h1>     

    <div class="p-8">
      <Greeting name="gusa"/>
    </div>
    <br/>
    
    <br/> <h1> Button   </h1>     

      <div style={{padding: "30px",width:"800px"}}>
        <Button/>
      </div>

    <br/> <h1> Accordion</h1>     
      <div style={{padding: "30px",width:"300px"}}>
        <Accordion/>
      </div>
{/*
    <MDX/>
*/}
    </>
  )
}

export default App
