import { useRef, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { randBlockName, classes, Block } from "./blocks_construct";
import { boxMath, } from "./helper";

export function GameScreen({ x_, y_, block, setBlockStr_ }) {
    let [boxes, setBoxes] = useState([]);
    let timer = useRef();
    let [confetti_size, setSize] = useState({ width: 0, height: 0 });
    let [last, setLast] = useState(false);

    useEffect(function(){ setLast(block === classes.at(-1)?true:false)}, [block] );
    useEffect(function(){
      const container__ = document.querySelector(".screen .game");
  
      // Dev
      const con = document.querySelector(".screen").getBoundingClientRect();
      setSize({ width: con.width, height: con.height})
  
      boxMath(container__, setBoxes);
      function resizeFun() {
        clearTimeout(timer.current); // To prevent Lag
        timer.current = setTimeout(() => boxMath(container__, setBoxes), 500);
      }
      window.addEventListener("resize", resizeFun);
      document.querySelector(".high-score").textContent = block;
      return () => window.removeEventListener("resize", resizeFun);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function dev() {
      setBlockStr_((name) => {
        if (name === classes.at(-1)) {
          setLast(true);
        }
        return randBlockName("dev");
      });
    }
    return (
      <div className="screen">
        {last && (
          <Confetti width={confetti_size.width} height={confetti_size.height} />
        )}
        <div className="game">
          <Block class_={block} top={y_ + "px"} left={x_ + "px"} />
          {[...boxes]}
        </div>
        <div className="right-side">
          <div className="score-box">
            <p>SCORE</p>
            <p className="cur-score">0</p>
            <p>HI-SCORE</p>
            <p className="high-score">{block}</p>
          </div>
  
          <div className="incoming-box" onClick={dev}>
            <p style={{ margin: "46% 0" }}>Next</p>
          </div>
  
          <div className="lvl_nd_speed">
            <p>
              LEVEL <span className="cur-lvl">1</span>
            </p>
            <p>
              SPEED <span className="cur-speed">1</span>
            </p>
          </div>
          <div className="gif-box"></div>
          <div className="info-box"></div>
        </div>
      </div>
    );
  }