import { nanoid } from 'nanoid'
import { returnClass,boxMath } from './components/js/helper'
import {useEffect, useRef, useState} from 'react'
import './components/css/App.css'
import './components/css/controls.css'
import './components/css/screen.css'
import './components/css/blocks.css'
import './components/css/responsive.css'
/**
 *  Creates App Generic Button
 * @param {string} size - The size of the Button.
 * @param {string[]|string} classes - classes set the parent element class.
 * @param {string} text - this the button text.
 * @returns {Element} A react Element
 */
function MyBtn({click,size,classes,text}){

  return (
          <div className={size+' gen-btn'+returnClass(classes)}>
              {/* <button></button> */}
              <div className='outer'><div onClick={click} className='inner'></div></div>
              {
                Array.isArray(text) ?
                    text.map(each=><p key={nanoid()} >{each.toUpperCase()}</p>)
                :<p>{text.toUpperCase()}</p>
              }
              
          </div>
        ) 
}

function GameScreen(){
  let [boxes,setBoxes] = useState([])
  let timer = useRef()
  useEffect(function(){
    const container__ =document.querySelector('.screen .game')
    boxMath(container__,setBoxes)
    function resizeFun(){
      clearTimeout(timer.current)// To prevent Lag
      timer.current=setTimeout(()=>boxMath(container__,setBoxes),3000)
    }
    window.addEventListener('resize',resizeFun)
    return ()=>window.removeEventListener('resize',resizeFun)
  },[])
    return (
      <div className="game">
        <div className="block l-block">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        {[...boxes]}
      </div>

    )

}



function App() {
  const setting_btns=[['start','pause'],'sound','setting',['exit','game']]
  let [x,setX] = useState(3)
  let [y,setY] = useState(3)

  function handleKeyUp(e){
    const block = document.querySelector('.block')
    if(!block)return
    if(typeof e === 'string'){
      let cup = e
      e={}
      e.key=cup
    }
    const px = 12
    if(['ArrowUp','ArrowDown'].includes(e.key)){
      setY((prevY) => {
        let newY = prevY
        if (e.key === 'ArrowUp') {
          newY = prevY - px // Move by larger increments for better visual feedback
        } else if (e.key === 'ArrowDown') {
          newY = prevY + px
        }
        block.style.top = newY + 'px'
        return newY
      })
    }else if(['ArrowLeft','ArrowRight'].includes(e.key)){
      setX((prevX) => {
        let newX = prevX
        if (e.key === 'ArrowLeft') {
          newX = prevX - px
        }else if (e.key === 'ArrowRight') {
          newX = prevX + px
        }
        block.style.left = newX + 'px'
        return newX
      })
    }
    

  }

  useEffect(function(){
    const block = document.querySelector('.block')
    if(!block)return

    block.style.top=y+'px'
    block.style.left=x+'px'
    window.addEventListener('keydown', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)

  },[])



  return (
    <div className="App">
      <div className='screen'>
        <GameScreen/>
        <div className="right-side">
          
          <div className="score-box">
            <p>SCORE</p>
            <p className="cur-score">0</p>
            <p>HI-SCORE</p>
            <p className="high-score">0</p>
          </div>
          
          <div className="incoming-box">
            
          </div>

          <div className='lvl_nd_speed'>
            <p>LEVEL <span className='cur-lvl'>1</span></p>
            <p>SPEED <span className='cur-speed'>1</span></p>
          </div>
          <div className='gif-box'></div>
          <div className='info-box'>

          </div>
        </div>
      </div>
      <div className='controls-case'>

        <section className="dir-case">
          <div className="first"><MyBtn click={()=>handleKeyUp('ArrowUp')} text='up / level'/></div>
          <div className="second">
            <MyBtn click={()=>handleKeyUp('ArrowLeft')} text={['left','prev game']} size='mid'/>
            <MyBtn click={()=>handleKeyUp('ArrowRight')} text={['right','next game']} size='mid'/>
          </div>
          <div className="third"><MyBtn click={()=>handleKeyUp('ArrowDown')} text="down / speed" size='mid'/></div>
        </section>

        <section className='settings-btns-rotate-btn-case'>
          <div className='settings-case'>
            {setting_btns.map(each=> <MyBtn key={nanoid()} size='small' text={each}/>)}
          </div>
          <MyBtn classes='rotate-btn-case' text={['rotate','direction']} size='big'/>
        </section>
        
      </div>
    </div>
  )
}


export default App;
