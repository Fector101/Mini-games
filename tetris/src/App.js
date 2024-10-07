import logo from './logo.svg';
import './components/css/App.css';
import './components/css/controls.css'
/**
 * 
 */
function returnClass(str_or_list){
  if(!str_or_list){return ''}
  else if (typeof str_or_list === 'string'){
    return ' '+str_or_list
  }
  else if (Array.isArray(str_or_list)){
    return ' '+ str_or_list.join(' ')
  }
}
function MyBtn({size,classes,text}){

  return (
          <div class={'gen-btn'+returnClass(classes)}>
              <div></div>
              <p>{text}</p>
          </div>
        ) 
}
function App() {
  const setting_btns=[['start','pause'],'sound','setting',['exit','game']]
  return (
    <div className="App">

      <div className='controls-case'>

        <div clasName="dir-case">
          <div className="first"><MyBtn text='up / level'/></div>
          <div className="second"><MyBtn text={['left','prev game']} size='mid'/><MyBtn text={['right','next game']} size='mid'/></div>
          <div className="third"><MyBtn text="down / speed" size='mid'/></div>
        </div>

        <div className='settings-btns-rotate-btn-case'>
          <div className='settings-case'>
            {setting_btns.map(each=> <MyBtn size='small' text={each}/>)}
          </div>
          <MyBtn text={['rotate','direction']} size='big'/>
        </div>
        
      </div>
    </div>
  );
}


const shitstain=()=>{(
        <>
          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          </header>
        </>)
}

export default App;
