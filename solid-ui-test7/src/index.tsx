/* @refresh reload */
import { render } from 'solid-js/web'
//import './index.css'
import App from './App.tsx'



import  { Counter }  from './Counter'; 
import  Tweet from './Tweet.mdx'; 


const root = document.getElementById('root')

render(() => <App />, root!)

