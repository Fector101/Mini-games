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
function MyBtn({pressEvent,size,classes,text}){
    let timer = useRef()
    function pressedBtn(){
        // pressEvent()
        console.log('down........')
        timer.current = setInterval(pressEvent,500)
        console.log(timer.current)
    }
    function rasiedBtn(){
        clearInterval(timer.current)
    }
    return (
          <div className={size+' gen-btn'+returnClass(classes)}>
              {/* <button></button> */}
              <div className='outer'><div onMouseDown={pressedBtn} onMouseUp={rasiedBtn} className='inner'></div></div>
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
      timer.current=setTimeout(()=>boxMath(container__,setBoxes),500)
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
        console.log('working...')
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
            setY(prevY => {
                let newY = prevY
                if (e.key === 'ArrowUp') {
                    newY = prevY - px
                    inBounds('y',-px)
                } else if (e.key === 'ArrowDown') {
                    inBounds('y',px)
                    newY = prevY + px
                }
                block.style.top = newY + 'px'
                return newY
            })
        }else if(['ArrowLeft','ArrowRight'].includes(e.key)){
            setX((prevX) => {
                let newX = prevX
                if (e.key === 'ArrowLeft') {
                    inBounds('x',-px)
                    newX = prevX - px
                }else if (e.key === 'ArrowRight') {
                    inBounds('x',px)
                    newX = prevX + px
                }
                // console.log(newX)
                // console.log('game', document.querySelector('.game').getBoundingClientRect().x)
                // document.querySelector('.cur-score').textContent=newX
                block.style.left = newX + 'px'
                // console.log('block',document.querySelector('.block').getBoundingClientRect().x)
                // console.log('calc',document.querySelector('.game').getBoundingClientRect().x-document.querySelector('.block').getBoundingClientRect().x)
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
        
    // eslint-disable-next-line
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
          <div className="first"><MyBtn pressEvent={()=>handleKeyUp('ArrowUp')} text='up / level'/></div>
          <div className="second">
            <MyBtn pressEvent={()=>handleKeyUp('ArrowLeft')} text={['left','prev game']} size='mid'/>
            <MyBtn pressEvent={()=>handleKeyUp('ArrowRight')} text={['right','next game']} size='mid'/>
          </div>
          <div className="third"><MyBtn pressEvent={()=>handleKeyUp('ArrowDown')} text="down / speed" size='mid'/></div>
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
