import { useRef, useEffect } from "react";
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
  
export function ControlsCase({handleKeyUp_, resetSpeed_, speed_ }) {
    const setting_btns = [
      ["start", "pause"],
      "sound",
      "setting",
      ["exit", "game"],
    ];
    // let [x,setX_] = useState(3)
    // let [y,setY_] = useState(3)
  
    
    useEffect(function () {
      window.addEventListener("keydown", handleKeyUp_);
      return () => window.removeEventListener("keydown", handleKeyUp_);
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
              pressEvent={() => handleKeyUp_("ArrowUp")}
              text="up / level"
            />
          </div>
          <div className="second">
            <MovementBtn
              speed__={speed_}
              resetSpeed__={resetSpeed_}
              pressEvent={() => handleKeyUp_("ArrowLeft")}
              text={["left", "prev game"]}
              size="mid"
            />
            <MovementBtn
              speed__={speed_}
              resetSpeed__={resetSpeed_}
              pressEvent={() => handleKeyUp_("ArrowRight")}
              text={["right", "next game"]}
              size="mid"
            />
          </div>
          <div className="third">
            <MovementBtn
              speed__={speed_}
              resetSpeed__={resetSpeed_}
              pressEvent={() => handleKeyUp_("ArrowDown")}
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
  