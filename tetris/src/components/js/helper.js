// A collection of Helpful Independent Functions
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
  // console.log(con_size)
  // const box_size=(7 * 280.078125 * 291) / (con_size.width*con_size.height)
  const box_size =15 //Same width and height
  const margin = 2
  const actual_size=box_size+margin
  const rows = Math.trunc(con_size.height /actual_size)   
  const columns = Math.trunc(con_size.width / actual_size)
  const totalCells = rows * columns;
  document.querySelector('.high-score').textContent=totalCells+' blocks'
  
  let boxes_=[]
  for (let i = 1; i <= totalCells; i++) {
	  boxes_.push(<div className='box' style={{minWidth:box_size+'px',minHeight:box_size+'px',maxWidth:box_size+'px',maxHeight:box_size+'px'}} key={nanoid()}></div>)
  }
  SetBoxes(boxes_)
  return [rows,columns]
}

export function randInt(start=0,end){
  const gen = ()=> Math.trunc(Math.random() * end)
  let int_= gen()
  if(int_ < start){
	randInt()
  }
  return int_
}


export function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

/**
   *  Creates App Generic Button
   * @param {string} coord - Can be 'x' or 'y'
   * @param {Number} pixels_to_move - The current block position i.e 'top' and 'left' neg or pos, positive if going right and vice verse
   * @returns {Boolean} a boolean that blah blah
   */
export function inBounds(coord = "", pixels_to_move = 0) {
  // For dynamic screen size
  const container__ = document.querySelector(".screen .game").getBoundingClientRect();
  const current_block = document.querySelector(".game .block.current")
  const current_block_cells = Array.from(document.querySelectorAll(".game .block.current .cell"))
  const current_block_cells_bounds = current_block_cells.map(e=>e.getBoundingClientRect())
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
	const all_blocks = Array.from(document.querySelectorAll('.block:not(.current) .cell')) // All Blocks Except Current Block.
	// console.log(all_blocks)
	// const all_blocks = Array.from(document.querySelectorAll('.block:not(.current)')) // All Blocks Except Current Block.
	if(all_blocks.length === 0 )return true
	// Checking a range of values.
	const min_range = parseFloat(current_block.style.left)
	const max_range = parseFloat(current_block.style.left) + cur_block_bounds.width 
	let blocks_under=[]
	
	
	// function blockRightAtSide(){
		// Use style.left to current_block and check other blocks  style.left to see which is closer
		// if(pixels_to_move < 0){//Moving Block Left
		// }else{// Moving Block Right
		// }
	// }
	let willCollideY=false
	let willCollideX=false
	function checkY(){
		// Used to checks For Tallest
		const collidingLeft = B1 => B1 >= min_range && B1 <= max_range
		const collidingRight = A1 => A1 >= min_range && A1 <= max_range
		const collidingMiddle = (A1,B1) => A1 < min_range && B1 >= max_range
		const blockUnder = (cur_cell_below,down_block_x,down_block_width) =>{
			// return current_block_cells_bounds.some((bounds,i)=>{
			let cells = []//cells of the current_block that have cells under it
			for (let i = 0; i < current_block_cells_bounds.length; i++) {
				const bounds=current_block_cells_bounds[i]
				const A1 = down_block_x
				const B1 = A1+down_block_width
				const A2 =  bounds.x
				const B2 =  A2 + bounds.width
				// console.log(A1,B1)
				// console.log(A2,B2)
				// Blocks Already On Screen Tips
				const isLeftTip =() => A1 <= B2 && B1 >= B2
				const isRightTip =() =>B1 >= A2 && A1 <= A2
				
				// const isRightTip =() =>A1 <= A2 && A1 <= B2
				// const isLeftTip =() => B1 >= A2 && B2 <= B1
				if(isLeftTip()||isRightTip()){
					// console.log(e,current_block_cells[dev]);
					// console.log(isLeftTip(),'||',isRightTip())
					// console.log(current_block_cells[i])
					cells.push(current_block_cells[i])
					// break
				}
			}
			// Finding Closest to bottom 
			let lowest_cell = cells[0]
			cells.forEach(each=> {
				if(each.getBoundingClientRect().bottom > lowest_cell.getBoundingClientRect().bottom){
					lowest_cell = each
				}
			})
			return lowest_cell
		}
		const hasMeetTallest = (T1,B2_nd_pixels_to_move) => T1 <= B2_nd_pixels_to_move //Top_1 Bottom_2
		// console.log(all_blocks)
		for (let index = 0; index < all_blocks.length; index++) {
			const each_block = all_blocks[index]
			const each_block_bounds = each_block.getBoundingClientRect()
			const top_axis_for_block_down = each_block_bounds.top

			// Some Won't Check Blocks Above
			const block_is_below = current_block_cells_bounds.some(each=>top_axis_for_block_down >= each.bottom)
			
			if(block_is_below){	//Not Checking Elements Above or in Same Y of it.
				// console.log(block_down_top,cur_block_btm + pixels_to_move)
				// console.log(each_block_bounds.x,each_block_bounds.width)
				const cell_at_top = blockUnder(each_block,each_block_bounds.x,each_block_bounds.width)
				if(cell_at_top){ // Checks if block is right under
					// willCollideY = current_block_cells_bounds.some((each_cell,dev)=>hasMeetTallest(current_block_cells[dev],top_axis_for_block_down,each_cell.bottom + pixels_to_move))
					console.log(cell_at_top)
					willCollideY = hasMeetTallest(top_axis_for_block_down,cell_at_top.getBoundingClientRect().bottom + pixels_to_move)
				}else{
					willCollideY=false
				}
				// console.log(willCollideY)
			}
			
			if(willCollideY){ blocks_under.push(each_block) }
		}
		// console.log(blocks_under)
		// willCollideY = false
		
		
		willCollideY = Boolean(blocks_under.length)
	}
	function checkX(){
		const A2 = parseFloat(current_block.style.left) 
		const B2 = parseFloat(current_block.style.left) + cur_block_bounds.width
		
		const A2_pxs_to_move = parseFloat(current_block.style.left) + pixels_to_move
		const B2_pxs_to_move = parseFloat(current_block.style.left) + cur_block_bounds.width + pixels_to_move
		
		const min_range = cur_block_bounds.top
		const max_range = cur_block_bounds.bottom

		const canNotMoveRight = A1 => A1 > B2 && B2_pxs_to_move >= A1
		const canNotMoveLeft = B1 => B1 < A2 && A2_pxs_to_move <= B1
		const isInBtw = (each_bound)=>each_bound.top <= min_range && each_bound.bottom >= max_range
		const isBtmInSameAxesWithAnother = (each_bound)=>each_bound.top <= max_range && each_bound.bottom >= min_range
		// const isTopInSameAxesWithAnother = (each_bound)=>each_bound.top <= max_range && each_bound.bottom >= min_range
		
		let elements_that_will_collide_at_side=[]
		for (let index = 0; index < all_blocks.length; index++) {
			const each_block = all_blocks[index]
			const each_bounds = each_block.getBoundingClientRect()
			if(isInBtw(each_bounds) || isBtmInSameAxesWithAnother(each_bounds)){
				console.log('checking...')
				const a1=parseFloat(each_block.style.left)
				const b1=each_block.getBoundingClientRect().width + parseFloat(each_block.style.left)
				console.log(canNotMoveRight(a1) ,'||', canNotMoveLeft(b1))
				willCollideX = canNotMoveRight(a1) || canNotMoveLeft(b1)
				if(willCollideX){elements_that_will_collide_at_side.push(each_block)}
			}
			willCollideX = Boolean(elements_that_will_collide_at_side.length)

		}

	}
	coord === 'y' ? checkY() : checkX()


	if ( coord === "x" && willCollideX ) {
	  return false;
	} else if (coord === "y"  && willCollideY) {// This Means it right Under
		return false
	}
	
	// console.log('--------------------')
	document.querySelector(".cur-score").textContent = "pass";
	return true;
  }
  state = notCollidingWithAnotherBlock() && inScreen()
  return state
}