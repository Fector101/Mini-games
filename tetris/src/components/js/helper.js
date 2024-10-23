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
  const current_block = Array.from(document.querySelectorAll(".game .block")).at(-1)
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
	const all_blocks = Array.from(document.querySelectorAll('.block')) // Except Current Block.
	if(all_blocks.length === 1 )return true
	all_blocks.pop()  // Removing element about to be checked
	// Checking a range of values for tyhe right side
	const min_range = parseFloat(current_block.style.left)
	const max_range = parseFloat(current_block.style.left) + cur_block_bounds.width 
	let blocks_under=[]
	
	/**
	 * @returns {Element}
	 */
	function blockRightUnder(){
	  let block_right_under=blocks_under[0]
	  blocks_under.forEach((e,i,list)=>{
		if(parseFloat(block_right_under.style.top) > parseFloat(e.style.top)){
		  block_right_under=e
		}
	  })
	  return block_right_under
	}
	let willCollideY=false
	let willCollideX=false
	function checkY(){
		const collidingLeft = B1 => B1 >= min_range && B1 <= max_range
		const collidingRight = A1 => A1 >= min_range && A1 <= max_range
		const collidingMiddle = (A1,B1) => A1 < min_range && B1 >= max_range

		for (let index = 0; index < all_blocks.length; index++) {
			const each_block = all_blocks[index]
			const h1 = parseFloat(each_block.style.top)
			const h2 = parseFloat(current_block.style.top)
			if(h1 <= h2){	//Not Checking Elements Above or in Same Y of it.
			  continue
			}
			const a1=parseFloat(each_block.style.left)
			const b1=each_block.getBoundingClientRect().width + parseFloat(each_block.style.left)
			
			willCollideY = collidingLeft(b1) || collidingRight(a1) || collidingMiddle(a1,b1)
			if(willCollideY){
			  blocks_under.push(each_block)
			}
		}
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
		
		let elements_at_side=[]
		for (let index = 0; index < all_blocks.length; index++) {
			// FIX Get the closest Next Element does'nt Check All Elements Right and Left
			const each_block = all_blocks[index]
			const each_bounds = each_block.getBoundingClientRect()

			// const h1 = parseFloat(each_block.style.top)
			// const h2 = parseFloat(current_block.style.top)
			// if(h1 > h2 || h2 > h1){	// Not Checking Elements Below Or Above it.
			//   continue
			// }
			if(isInBtw(each_bounds) || isBtmInSameAxesWithAnother(each_bounds)){
				// if(pixels_to_move < 0){//Moving Block Left

				// }else{// Moving Block Right

				// }
				console.log('checking...')
				const a1=parseFloat(each_block.style.left)
				const b1=each_block.getBoundingClientRect().width + parseFloat(each_block.style.left)
				console.log(canNotMoveRight(a1) ,'||', canNotMoveLeft(b1))
				willCollideX = canNotMoveRight(a1) || canNotMoveLeft(b1)
				
			}
			willCollideX = Boolean(elements_at_side.length)

		}

	}
	coord === 'y' ? checkY() : checkX()


	if ( coord === "x" && willCollideX ) {
	  return false;
	} else if (coord === "y"  && willCollideY) {// This Means it right Under
		// console.log('Will Collide.')
		const cur_btm=parseFloat(current_block.style.top) + cur_block_bounds.height + pixels_to_move +2
		if(cur_btm > parseFloat(blockRightUnder().style.top)){  // Meet Tall Block
			// console.log('Tallest Block and Closest to Top')
			return false
		}
		return true
	}
	
	// console.log('--------------------')
	document.querySelector(".cur-score").textContent = "pass";
	return true;
  }
  state = notCollidingWithAnotherBlock() && inScreen()
  return state
}