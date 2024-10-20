import { nanoid } from "nanoid";
import { returnClass, boxMath } from "./components/js/helper";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import "./components/css/App.css";
import "./components/css/controls.css";
import "./components/css/screen.css";
import "./components/css/blocks.css";
import "./components/css/responsive.css";
import { Block, classes, randBlockName} from "./components/js/blocks_construct.js";
import { ControlsCase } from "./components/js/ControlCase.js";
import { GameScreen } from "./components/js/GameScreen.js";


function App() {
  let [x, setX] = useState(3);
  let [y, setY] = useState(2.5);
  let speed = useRef(1);
  let [block_str, setBlockStr] = useState(()=>randBlockName('dev'));

  useEffect(function () {
    const block = document.querySelector(".block");
    if (!block) return;
    block.style.top = y + "px";
    block.style.left = x + "px";
    window.addEventListener("keyup", (e) => {
      if (e.key === "k") {
        setBlockStr(randBlockName("dev"));
      }if (e.key === "l") {
        setBlockStr(randBlockName("dev1"));
      }
    });

    // eslint-disable-next-line
  }, []);
  const resetSpeed = () =>  speed.current = 1;
  return (
    <div className="App">
      <GameScreen x_={x} y_={y} block={block_str} setBlockStr_={setBlockStr} />
      <ControlsCase speed_={speed} resetSpeed_={resetSpeed} x_={x} y_={y} setX_={setX} setY_={setY} />
    </div>
  );
}

export default App;
