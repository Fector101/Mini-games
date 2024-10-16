import { nanoid } from 'nanoid'
import { returnClass,boxMath } from './components/js/helper'
import {useEffect, useRef, useState} from 'react'
import './components/css/App.css'
import './components/css/controls.css'
import './components/css/screen.css'
import './components/css/blocks.css'
import './components/css/responsive.css'
function isTouchDevice(){
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
/**
 *  Creates App Generic Button
 * @param {string} size - The size of the Button.
 * @param {string[]|string} classes - classes set the parent element class.
 * @param {string} text - this the button text.
 * @returns {Element} A react Element
 */
function MyBtn({speed__,resetSpeed__,pressEvent,size,classes,text}){
    let timer = useRef()
    function action(){
      pressedBtn(undefined,500/speed__.current)
      if (speed__.current < 7 ){
          speed__.current +=0.6
      }
    }
    function pressedBtn(_,ms=1000){
      pressEvent()
      // document.querySelector('.high-score').textContent=Math.random().toFixed(2)
      timer.current = setTimeout(action,ms)
    }
    function raisedBtn(){
      resetSpeed__()
      clearTimeout(timer.current)
    }
    
    return (
          <div className={size+' gen-btn'+returnClass(classes)}>
              <div onTouchStart={pressedBtn} onTouchEnd={raisedBtn} onMouseDown={ ()=>{!isTouchDevice()&&pressedBtn()}} onMouseUp={raisedBtn} className='outer'><div className='inner'></div></div>
              {
                Array.isArray(text) ?
                    text.map(each=><p key={nanoid()} >{each.toUpperCase()}</p>)
                :<p>{text.toUpperCase()}</p>
              }
              
          </div>
        ) 
}

function GameScreen({x_,y_}){
    let [boxes,setBoxes] = useState([])
    let timer = useRef()
    
  useEffect(function(){
    const container__ =document.querySelector('.screen .game')
    boxMath(container__,setBoxes)
    function resizeFun(){
      clearTimeout(timer.current)// To prevent Lag
      timer.current=setTimeout(()=>boxMath(container__,setBoxes),500)
    }
    window.addEventListener('resize',resizeFun)
    return ()=>window.removeEventListener('resize',resizeFun)
  },[])
    return (
      <div className="game">
        <div className="block l-block" style={{top:y_+'px',left:x_+'px'}}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        {[...boxes]}
      </div>

    )

}

function ControlsCase({x_,y_,setX_,setY_,resetSpeed_,speed_}){
  const setting_btns=[['start','pause'],'sound','setting',['exit','game']]
  // let [x,setX_] = useState(3)
  // let [y,setY_] = useState(3)
  
  function checkCollision(){
    const container__ =document.querySelector('.screen .game').getBoundingClientRect()
    const block =document.querySelector('.screen .game .block').getBoundingClientRect()

    if(container__.x===block.x){
        console.log('Foul')
    }
    // console.log('case ' + container__.x, 'block '+block.x)
    
  }
  /**
  *  Creates App Generic Button
  * @param {string} coord - Can be 'x' or 'y'
  * @param {Number} pixels_to_move - The current block position i.e 'top' and 'left' neg or pos, positive if going right and vice verse
  * @returns {Boolean} a boolean that blah blah
  */
  function inBounds(coord='',pixels_to_move=0){
      // For dynamic screen size
      const container__ =document.querySelector('.screen .game').getBoundingClientRect()
      const block =document.querySelector('.screen .game .block').getBoundingClientRect()
      // console.log('gotten value',new_value,'calc value',block.x+new_value)
      // console.log(block.y+pixels_to_move, container__.bottom - block.height)
      if(coord === 'x' && (block.x+pixels_to_move < container__.x || block.x+pixels_to_move > container__.right - block.width)){
          document.querySelector('.cur-score').textContent='foul'
          return false
      }
      else if(coord === 'y' && (block.y+pixels_to_move < container__.y || block.y+pixels_to_move > container__.bottom-(pixels_to_move*2))){
          document.querySelector('.cur-score').textContent='foul'
          return false
      }

      // console.log('--------------------')
      document.querySelector('.cur-score').textContent='pass'
      return true

  }
  function handleKeyUp(e){
      const block = document.querySelector('.block')
      if(!block)return
      if(typeof e === 'string'){
          let cup = e
          e={key:cup}
      }
      // So No lag if function becomes larger
      if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))return
      // setTimeout(checkCollision,100)
      checkCollision()
      const px = 12
      if(['ArrowUp','ArrowDown'].includes(e.key)){
          setY_(prevY => {
              let newY = prevY
              if (e.key === 'ArrowUp') {
                  newY = inBounds('y',-px)? prevY - px :prevY
              } else if (e.key === 'ArrowDown') {
                  newY = inBounds('y',px)? prevY + px:prevY
              }
              // block.style.top = newY + 'px'
              return newY
          })
      }else if(['ArrowLeft','ArrowRight'].includes(e.key)){
          setX_((prevX) => {
              let newX = prevX
              if (e.key === 'ArrowLeft') {
                  newX = inBounds('x',-px) ? prevX - px : prevX
              }else if (e.key === 'ArrowRight') {
                  newX = inBounds('x',px) ? prevX + px : prevX
              }
              
              return newX
          })
      }

  }
  useEffect(function(){
    window.addEventListener('keydown', handleKeyUp)
    return () => window.removeEventListener('keydown', handleKeyUp)
    // console.log(e,this)
  // eslint-disable-next-line
  },[])
  return(
    <div className='controls-case'>

    <section className="dir-case">
      <div className="first"><MyBtn speed__={speed_} resetSpeed__={resetSpeed_} pressEvent={()=>handleKeyUp('ArrowUp')} text='up / level'/></div>
      <div className="second">
        <MyBtn speed__={speed_} resetSpeed__={resetSpeed_} pressEvent={()=>handleKeyUp('ArrowLeft')} text={['left','prev game']} size='mid'/>
        <MyBtn speed__={speed_} resetSpeed__={resetSpeed_} pressEvent={()=>handleKeyUp('ArrowRight')} text={['right','next game']} size='mid'/>
      </div>
      <div className="third"><MyBtn  speed__={speed_} resetSpeed__={resetSpeed_} pressEvent={()=>handleKeyUp('ArrowDown')} text="down / speed" size='mid'/></div>
    </section>

    <section className='settings-btns-rotate-btn-case'>
      <div className='settings-case'>
        {setting_btns.map(each=> <MyBtn key={nanoid()} size='small' text={each}/>)}
      </div>
      <MyBtn classes='rotate-btn-case' text={['rotate','direction']} size='big'/>
    </section>
    
  </div>
  )
}


function App() {
  let [x,setX] = useState(3)
  let [y,setY] = useState(3)
  let speed=useRef(1)
  
  useEffect(function(){
      const block = document.querySelector('.block')
      if(!block)return
      block.style.top=y+'px'
      block.style.left=x+'px'
      
      
  // eslint-disable-next-line
  },[])
  function resetSpeed(){
    speed.current = 1
  }
  return (
    <div className="App">
      <div className='screen'>
        <GameScreen x_={x} y_={y}/>
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
     <ControlsCase speed_={speed} resetSpeed_={resetSpeed} x_={x} y_={y} setX_={setX} setY_={setY} />
    </div>
  )
}


export default App;
