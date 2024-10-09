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