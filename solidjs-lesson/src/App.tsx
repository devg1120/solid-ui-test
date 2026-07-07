import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import Lesson1 from './lesson/solid-lesson1'
import Lesson2 from './lesson/solid-lesson2'
import Lesson3 from './lesson/solid-lesson3'
import Lesson4 from './lesson/solid-lesson4'
import Lesson4b from './lesson/solid-lesson4b'
import Lesson4c from './lesson/solid-lesson4c'
import Lesson5 from './lesson/solid-lesson5'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
       <a href="https://qiita.com/BRSF/items/c0881d34be3d4d9e3879" target="_blank">
           <img class="button-icon" src={solidLogo} alt="" width="30" height="30"/>
            JSフレームワークsolidJS LESSON
       </a>
      <div class="section">
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          class="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count()}
        </button>
      </div>

      <div class="section">
        <div>
          <h3>Lesson1 フォーム操作：テキスト文字を表示させる</h3>
        </div>
	<Lesson1/>
      </div>

      <div class="section">
        <div>
          <h3>lesson2 プルダウンメニュー（ループ処理）</h3>
        </div>
	<lesson2/>
      </div>

      <div class="section">
        <div>
          <h1>Lesson3 検索フォーム(値の連動)</h1>
        </div>
	<Lesson3/>
      </div>

      <div class="section">
        <div>
          <h1>Lesson4 データリストの追加、削除、修正（DOMの再生成）</h1>
        </div>
	<Lesson4/>
      </div>

      <div class="section">
        <div>
          <h1>Lesson4b データリスト　createStore,produce使用　</h1>
        </div>
	<Lesson4b/>
      </div>

      <div class="section">
        <div>
          <h1>Lesson4c データリスト　createStore,produce使用　複数</h1>
        </div>
	<Lesson4c/>
      </div>

      <div class="section">
        <div>
          <h1>Lesson5 コンポネント制御（親・子）</h1>
        </div>
	<Lesson5/>
      </div>


      <br/>
      <hr/>
      <div id="next-steps">
        <div id="docs">
          <h3>Documentation</h3>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img class="logo" src={viteLogo} alt="" width="60" height="60"/>
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://solidjs.com/" target="_blank">
                <img class="button-icon" src={solidLogo} alt="" width="60" height="60"/>
                Learn more
              </a>
            </li>
          </ul>
        </div>
      </div>

    </>
  )
}

export default App
