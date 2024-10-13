import {nanoid} from 'nanoid'
/**
 *  Computes list to give string with space at front if str_or_list is not undefined
 * @param {string[]|string} str_or_list - classes set the parent element class.
 * @returns {string} A String
 */
export function returnClass(str_or_list){
    if(!str_or_list){return ''}
    else if (typeof str_or_list === 'string'){
      return ' ' + str_or_list
    }
    else if (Array.isArray(str_or_list)){
      return ' ' + str_or_list.join(' ')
    }
}
export function boxMath(container,SetBoxes){
    
  if(!container)return
  // const con_size=container.getBoundingClientRect()
  const con_size={height:container.clientHeight,width:container.clientWidth}
  console.log(con_size)
  // const box_size=(7 * 280.078125 * 291) / (con_size.width*con_size.height)
  const box_size =10 //Same width and height
  const margin = 2
  const actual_size=box_size+margin
  const rows = Math.trunc(con_size.height /actual_size)   
  const columns = Math.trunc(con_size.width / actual_size)
  const totalCells = rows * columns;
  console.log(totalCells)
  document.querySelector('.high-score').textContent=totalCells+' blocks'
  
  let boxes_=[]
  for (let i = 1; i <= totalCells; i++) {
      boxes_.push(<div className='box' style={{minWidth:box_size+'px',minHeight:box_size+'px',maxWidth:box_size+'px',maxHeight:box_size+'px'}} key={nanoid()}></div>)
  }
  SetBoxes(boxes_)
}