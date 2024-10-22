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
  let rows_and_columns = useRef([]);
  let [blocks, setBlocks] = useState(()=>[<Block key={nanoid()} class_={randBlockName('dev')} top={y} left={x} />]);
  useEffect(function(){
    // setBlocks(old=>[...old,])
  },[x,y])
  // useEffect(function(){blocks.at(-1).props.top=y;blocks.at(-1).props.left=x;},[x,y])
  function checkRow(){
    const container = document.querySelector('.screen .game')
    const boxes=Array.from(container.querySelectorAll('.box'))
    const blocks=Array.from(container.querySelectorAll('.block'))
    
    // Check is there are blocks in same X
    // Then Check the blocks each cell if in same x 
    const in_same_X = blocks.filter(function(each){

    })
    const first_box= boxes[0].style.backgroundColor='red'
    const last_box= boxes.at(-1).style.backgroundColor='yellow'

    const all_cells_Y = blocks.map(function(each_block){
      // List of each cell 'x'
      const block_cells_Y= Array.from(each_block.querySelectorAll('.cell')).map(each_cell=>each_cell.getBoundingClientRect().y)
      return block_cells_Y
    })
    function isEqualToWidth(){
      const y_axes_begin_occupied = [...new Set(all_cells_Y.flat())]
      const y_axes = all_cells_Y.flat()
      let stats= {}
      y_axes_begin_occupied.forEach(each=>stats[each] = 0)
      for(let i = 0; i < y_axes.length; i++){
        const each = y_axes[i]
        stats[each] += 1
      }
      // console.log(rows_and_columns)
      // console.log(stats)
    }
    isEqualToWidth()
  }
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
    const current_block = Array.from(document.querySelectorAll(".game .block")).at(-1)
    const cur_block_bounds = current_block.getBoundingClientRect()
    let state = true
    function inScreen(){
      if ( coord === "x" && (cur_block_bounds.x + pixels_to_move < container__.x || cur_block_bounds.x + pixels_to_move > container__.right - cur_block_bounds.width)
      ) {
        document.querySelector(".cur-score").textContent = "foul";
        return false;
      } else if ( coord === "y" && (cur_block_bounds.y + pixels_to_move < container__.y || cur_block_bounds.bottom + pixels_to_move > container__.bottom)) {
        document.querySelector(".cur-score").textContent = "foul";
        return false;
      }
      
      // console.log('--------------------')
      document.querySelector(".cur-score").textContent = "pass";
      return true;
    }
    
    function notCollidingWithAnotherBlock(){
      const all_blocks = Array.from(document.querySelectorAll('.block')) // Except Current Block.
      if(all_blocks.length === 1 )return true
      all_blocks.pop()  // Removing element about to be checked
      const all_blocks_Top =  all_blocks.map(e=>e.getBoundingClientRect().top)
      if ( coord === "x" && (cur_block_bounds.x + pixels_to_move < container__.x || cur_block_bounds.x + pixels_to_move > container__.right - cur_block_bounds.width)
      ) {
        document.querySelector(".cur-score").textContent = "foul";
        return false;
      } else if ( coord === "y" &&  all_blocks_Top.some(top_v=> cur_block_bounds.bottom + pixels_to_move > top_v)) {
        let A1 = all_blocks.map(e=> parseFloat(e.style.left))
        let A2 = all_blocks.map(e=> e.getBoundingClientRect().width + 2 ) // 2px is the margin
        // Checking a range of values for tyhe right side
        const min_range = parseFloat(current_block.style.left)
        const max_range = parseFloat(current_block.style.left) + cur_block_bounds.width + 2
        console.log('Meet Tallest Block.')
        // console.log()
        if(A1.some(e=> e >= min_range)  && A2.some(e=> e<=max_range)){   // This Means it right Under
          console.log('Block Under.')
          return false;
        }
        return true
        // console.log(all_blocks_Top,cur_block_bounds.bottom)
        document.querySelector(".cur-score").textContent = "foul";
      }
      
      // console.log('--------------------')
      document.querySelector(".cur-score").textContent = "pass";
      return true;
    }
    state = notCollidingWithAnotherBlock() && inScreen()
    return state
  }
  function ANOTHER_(){
    // const parent = document.querySelector('.screen .game')
    setY('2.5px')
    setX('3px')
    setBlocks(old=>[...old,<Block key={nanoid()} class_={randBlockName('dev')} top={'2.5px'} left={'3px'} />])


  }
  function handleKeyUp(e) {
    const current_block = Array.from(document.querySelectorAll(".game .block")).at(-1)
    // console.log(current_block)
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
          
        }
        // console.log(block,newY)
        newY= newY+'px'
        current_block.style.top = newY
        if(e.key === "ArrowDown" && !inBounds('y',px)){
          ANOTHER_()
          checkRow()
        }
        
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
      <GameScreen rows_and_columns_={rows_and_columns} handleKeyUp_={handleKeyUp} speed_={speed} x_={x} y_={y} blocks_={blocks} setBlockStr_={setBlocks} />
      <ControlsCase handleKeyUp_={handleKeyUp} speed_={speed} resetSpeed_={resetSpeed} x_={x} y_={y} setX_={setX} setY_={setY} />
    </div>
  );
}

export default App;
// The link was a dream,
// A shadow of what once was—
// Now, nothing remains.