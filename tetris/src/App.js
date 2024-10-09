import { nanoid } from 'nanoid'
import { returnClass } from './components/js/helper'
import './components/css/App.css'
import './components/css/controls.css'
import './components/css/screen.css'
import './components/css/responsive.css'
/**
 *  Creates App Generic Button
 * @param {string} size - The size of the Button.
 * @param {string[]|string} classes - classes set the parent element class.
 * @param {string} text - this the button text.
 * @returns {Element} A react Element
 */
function MyBtn({size,classes,text}){

  return (
          <div className={size+' gen-btn'+returnClass(classes)}>
              {/* <button></button> */}
              <div className='outer'><div className='inner'></div></div>
              {
                Array.isArray(text) ?
                    text.map(each=><p key={nanoid()} >{each.toUpperCase()}</p>)
                :<p>{text.toUpperCase()}</p>
              }
              
          </div>
        ) 
}
function App() {
  const setting_btns=[['start','pause'],'sound','setting',['exit','game']]
  return (
    <div className="App">
      <div className='screen'></div>
      <div className='controls-case'>

        <section className="dir-case">
          <div className="first"><MyBtn text='up / level'/></div>
          <div className="second"><MyBtn text={['left','prev game']} size='mid'/><MyBtn text={['right','next game']} size='mid'/></div>
          <div className="third"><MyBtn text="down / speed" size='mid'/></div>
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
