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
  const con_size=container.getBoundingClientRect()
  const a=(21*(313.78125 * 291))/(con_size.width*con_size.height)


  const each_box_size=a
  const rows = Math.trunc(con_size.height /each_box_size)   
  const columns = Math.trunc(con_size.width / each_box_size)
  const totalCells = rows * columns;
  let boxes_=[]
  
  for (let i = 1; i <= totalCells; i++) {
      boxes_.push(<div className='box' style={{width:a+'px',height:a+'px'}} key={nanoid()}></div>)
  }
  SetBoxes(boxes_)
}