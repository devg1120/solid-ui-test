import { createSignal } from 'solid-js'

import solidLogo from './assets/solid.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

//import { Button } from "~/components/ui/button"

import { Element as Button } from "~/examples/Button"
import { Element as Accordion } from "~/examples/Accordion"


function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
    <br/> <h1> Button   </h1>     

      <div style={{padding: "30px",width:"800px"}}>
        <Button/>
      </div>

    <br/> <h1> Accordion</h1>     
      <div style={{padding: "30px",width:"300px"}}>
        <Accordion/>
      </div>

    </>
  )
}

export default App
