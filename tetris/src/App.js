import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import "./components/css/App.css";
import "./components/css/controls.css";
import "./components/css/screen.css";
import "./components/css/blocks.css";
import "./components/css/responsive.css";
import { randBlockName, Block} from "./components/js/blocks_construct.js";
import { ControlsCase } from "./components/js/ControlCase.js";
import { GameScreen } from "./components/js/GameScreen.js";


function App() {
  let [x, setX] = useState('3px');
  let [y, setY] = useState('2.5px');
  let speed = useRef(1);
  let [blocks, setBlocks] = useState(()=>[<Block key={nanoid()} class_={randBlockName('dev')} top={y} left={x} />]);
  useEffect(function(){
    // setBlocks(old=>[...old,])
  },[x,y])
  // useEffect(function(){blocks.at(-1).props.top=y;blocks.at(-1).props.left=x;},[x,y])
  function checkCollision() {
    const container__ = document.querySelector(".screen .game").getBoundingClientRect();
    const current_block = Array.from(document.querySelectorAll(".game .block")).at(-1).getBoundingClientRect()

    if (container__.x === current_block.x) {
      console.log("Foul");
    }
    // console.log('case ' + container__.x, 'block '+block.x)
  }
  /**
   *  Creates App Generic Button
   * @param {string} coord - Can be 'x' or 'y'
   * @param {Number} pixels_to_move - The current block position i.e 'top' and 'left' neg or pos, positive if going right and vice verse
   * @returns {Boolean} a boolean that blah blah
   */
  function inBounds(coord = "", pixels_to_move = 0) {
    // For dynamic screen size
    const container__ = document.querySelector(".screen .game").getBoundingClientRect();
    const current_block = Array.from(document.querySelectorAll(".game .block")).at(-1).getBoundingClientRect()

    if ( coord === "x" && (current_block.x + pixels_to_move < container__.x || current_block.x + pixels_to_move > container__.right - current_block.width)
    ) {
      document.querySelector(".cur-score").textContent = "foul";
      return false;
    } else if ( coord === "y" && (current_block.y + pixels_to_move < container__.y || current_block.bottom + pixels_to_move > container__.bottom)) {
      document.querySelector(".cur-score").textContent = "foul";
      return false;
    }

    // console.log('--------------------')
    document.querySelector(".cur-score").textContent = "pass";
    return true;
  }
  function ANOTHER_(){
    // const parent = document.querySelector('.screen .game')
    setY('2.5px')
    setX('3px')
    setBlocks(old=>[...old,<Block key={nanoid()} class_={randBlockName('dev')} top={'3px'} left={'2.5px'} />])


  }
  function handleKeyUp(e) {
    const current_block = Array.from(document.querySelectorAll(".game .block")).at(-1)
    console.log(current_block)
    // const block = blocks.at(-1)
    if (!current_block) return;
    if (typeof e === "string") {
      let cup = e;
      e = { key: cup };
    }
    // So No lag if function becomes larger
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
      return;
    // setTimeout(checkCollision,100)
    checkCollision();
    const px = 17;
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      setY((oldY) => {
        const prevY = parseFloat(oldY)
        let newY = ''
        if (e.key === "ArrowUp") {
          newY = inBounds("y", -px) ? prevY - px : prevY;
        } else if (e.key === "ArrowDown") {
          newY = inBounds("y", px) ? prevY + px : prevY;
          if(!inBounds('y',px)){
            ANOTHER_()
          }
        }
        // console.log(block,newY)
        newY= newY+'px'
        current_block.style.top = newY
        
        
        return newY;
      });
    } else if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
      setX((oldX) => {
        const prevX = parseFloat(oldX)
        let newX = ''
        if (e.key === "ArrowLeft") {
          newX = inBounds("x", -px) ? prevX - px : prevX;
        } else if (e.key === "ArrowRight") {
          newX = inBounds("x", px) ? prevX + px : prevX;
        }
        newX= newX+'px'
        current_block.style.left = newX
        return newX;
      });
    }
  }


  useEffect(function () {
    const block = document.querySelector(".block");

    if (!block) return;
    block.style.top = y
    block.style.left = x
    window.addEventListener("keyup", (e) => {
      if (e.key === "k") { setBlocks(randBlockName("dev")) }if (e.key === "l") { setBlocks(randBlockName("dev1")) }
    })

    // eslint-disable-next-line
  }, []);
  const resetSpeed = () =>  speed.current = 1;
  return (
    <div className="App">
      <GameScreen handleKeyUp_={handleKeyUp} speed_={speed} x_={x} y_={y} blocks_={blocks} setBlockStr_={setBlocks} />
      <ControlsCase handleKeyUp_={handleKeyUp} speed_={speed} resetSpeed_={resetSpeed} x_={x} y_={y} setX_={setX} setY_={setY} />
    </div>
  );
}

export default App;
// The link was a dream,
// A shadow of what once was—
// Now, nothing remains.