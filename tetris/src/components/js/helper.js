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
  const each_box_size=21
  const rows = Math.trunc(con_size.height /each_box_size)||Math.trunc(container.clientHeight / 20)
  const columns = Math.trunc(con_size.width / each_box_size)||Math.trunc(container.clientWidth / 20)
  const totalCells = rows * columns;
  let boxes_=[]
  for (let i = 1; i <= totalCells; i++) {
      boxes_.push(<div className='box' key={nanoid()}></div>)
  }
  SetBoxes(boxes_)
}