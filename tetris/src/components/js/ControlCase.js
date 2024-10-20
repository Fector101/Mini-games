import { useRef, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { returnClass,isTouchDevice } from "./helper";
/**
 *  Creates App Generic Button
 * @param {string} size - The size of the Button.
 * @param {string[]|string} classes - classes set the parent element class.
 * @param {string} text - this the button text.
 * @returns {Element} A react Element
 */
function MovementBtn({
    speed__,
    resetSpeed__,
    pressEvent,
    size,
    classes,
    text,
  }) {
    let timer = useRef();
    function action() {
      pressedBtn(undefined, 250 / speed__.current);
      // if (speed__.current < 7 ){
      speed__.current = 5;
      // }
    }
    function pressedBtn(_, ms = 250) {
      pressEvent();
      // document.querySelector('.high-score').textContent=Math.random().toFixed(2)
      timer.current = setTimeout(action, ms);
    }
    function raisedBtn() {
      resetSpeed__();
      clearTimeout(timer.current);
    }
  
    return (
      <div className={size + " gen-btn" + returnClass(classes)}>
        <div
          onTouchStart={pressedBtn}
          onTouchEnd={raisedBtn}
          // onMouseDown={ ()=>{isTouchDevice()?pressEvent():pressedBtn()}}
          onMouseDown={() => {
            !isTouchDevice() && pressedBtn();
          }}
          onMouseUp={raisedBtn}
          className="outer"
        >
          <div className="inner"></div>
        </div>
        {Array.isArray(text) ? (
          text.map((each) => <p key={nanoid()}>{each.toUpperCase()}</p>)
        ) : (
          <p>{text.toUpperCase()}</p>
        )}
      </div>
    );
  }
  
  /**
   *  Creates App Generic Button
   * @param {string} size - The size of the Button.
   * @param {string[]|string} classes - classes set the parent element class.
   * @param {string} text - this the button text.
   * @returns {Element} A react Element
   */
  function MyBtn({ pressEvent, size, classes, text }) {
    let timer = useRef();
    let speed = useRef();
    function action() {
      pressedBtn(undefined, 500 / speed.current);
      if (speed.current < 7) {
        speed.current += 0.6;
      }
    }
    function pressedBtn(_, ms = 1000) {
      pressEvent();
      // document.querySelector('.high-score').textContent=Math.random().toFixed(2)
      timer.current = setTimeout(action, ms);
    }
    function raisedBtn() {
      // resetSpeed__()
      speed.current = 1;
      clearTimeout(timer.current);
    }
  
    return (
      <div className={size + " gen-btn" + returnClass(classes)}>
        <div
          onTouchStart={pressedBtn}
          onTouchEnd={raisedBtn}
          onMouseDown={() => {
            !isTouchDevice() && pressedBtn();
          }}
          onMouseUp={raisedBtn}
          className="outer"
        >
          <div className="inner"></div>
        </div>
        {Array.isArray(text) ? (
          text.map((each) => <p key={nanoid()}>{each.toUpperCase()}</p>)
        ) : (
          <p>{text.toUpperCase()}</p>
        )}
      </div>
    );
  }
  

export function ControlsCase({ x_, y_, setX_, setY_, resetSpeed_, speed_ }) {
    const setting_btns = [
      ["start", "pause"],
      "sound",
      "setting",
      ["exit", "game"],
    ];
    // let [x,setX_] = useState(3)
    // let [y,setY_] = useState(3)
  
    function checkCollision() {
      const container__ = document.querySelector(".screen .game").getBoundingClientRect();
      const block = document.querySelector(".screen .game .block").getBoundingClientRect();
  
      if (container__.x === block.x) {
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
      const block = document.querySelector(".screen .game .block").getBoundingClientRect();
      console.log(container__.bottom,block.bottom+pixels_to_move)
      // console.log('gotten value',new_value,'calc value',block.x+new_value)
      // console.log(block.y+pixels_to_move, container__.bottom - block.height)
      if ( coord === "x" && (block.x + pixels_to_move < container__.x || block.x + pixels_to_move > container__.right - block.width)
      ) {
        document.querySelector(".cur-score").textContent = "foul";
        return false;
      } else if ( coord === "y" && (block.y + pixels_to_move < container__.y || block.bottom + pixels_to_move > container__.bottom)) {
        document.querySelector(".cur-score").textContent = "foul";
        return false;
      }
  
      // console.log('--------------------')
      document.querySelector(".cur-score").textContent = "pass";
      return true;
    }
    function handleKeyUp(e) {
      const block = document.querySelector(".block");
      if (!block) return;
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
        setY_((prevY) => {
          let newY = prevY;
          if (e.key === "ArrowUp") {
            newY = inBounds("y", -px) ? prevY - px : prevY;
          } else if (e.key === "ArrowDown") {
            newY = inBounds("y", px) ? prevY + px : prevY;
          }
          // block.style.top = newY + 'px'
          return newY;
        });
      } else if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
        setX_((prevX) => {
          let newX = prevX;
          if (e.key === "ArrowLeft") {
            newX = inBounds("x", -px) ? prevX - px : prevX;
          } else if (e.key === "ArrowRight") {
            newX = inBounds("x", px) ? prevX + px : prevX;
          }
  
          return newX;
        });
      }
    }
    useEffect(function () {
      window.addEventListener("keydown", handleKeyUp);
      return () => window.removeEventListener("keydown", handleKeyUp);
      // console.log(e,this)
      // eslint-disable-next-line
    }, []);
    return (
      <div className="controls-case">
        <section className="dir-case">
          <div className="first">
            <MovementBtn
              speed__={speed_}
              resetSpeed__={resetSpeed_}
              pressEvent={() => handleKeyUp("ArrowUp")}
              text="up / level"
            />
          </div>
          <div className="second">
            <MovementBtn
              speed__={speed_}
              resetSpeed__={resetSpeed_}
              pressEvent={() => handleKeyUp("ArrowLeft")}
              text={["left", "prev game"]}
              size="mid"
            />
            <MovementBtn
              speed__={speed_}
              resetSpeed__={resetSpeed_}
              pressEvent={() => handleKeyUp("ArrowRight")}
              text={["right", "next game"]}
              size="mid"
            />
          </div>
          <div className="third">
            <MovementBtn
              speed__={speed_}
              resetSpeed__={resetSpeed_}
              pressEvent={() => handleKeyUp("ArrowDown")}
              text="down / speed"
              size="mid"
            />
          </div>
        </section>
  
        <section className="settings-btns-rotate-btn-case">
          <div className="settings-case">
            {setting_btns.map((each) => (
              <MyBtn
                speed__={speed_}
                resetSpeed__={() => console.log("Bad Component")}
                pressEvent={() => console.log("Very Bad Component")}
                key={nanoid()}
                size="small"
                text={each}
              />
            ))}
          </div>
          <MyBtn
            classes="rotate-btn-case"
            speed__={speed_}
            resetSpeed__={() => console.log("Bad Component")}
            pressEvent={() => console.log("Very Bad Component")}
            text={["rotate", "direction"]}
            size="big"
          />
        </section>
      </div>
    );
}
  