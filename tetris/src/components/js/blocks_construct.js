import React from "react";
import { randInt } from "./helper";

function BLOCK_STRUCTURE({style,class_}){
    return (
        <div style={style} className={'block ' + class_.replaceAll('_','-')}>
            {[...Array(4).keys()].map(i=><div key={i}></div>)}
        </div>
    )
    // return (<div></div> * 6)
}

/**
 * The block's main name should be first 'right-arm arm'
 */
export const classes = ['cube']
export const classes1={
    first:["letter-t", "R letter-t","R1 letter-t","R2 letter-t"],
    second:["j","R j", "R1 j", "R2 j"],
    third:["right-arm","right-arm R","right-arm R1","right-arm R2"],
    fourth:["shifted-cube", "shifted-cube R"],
    fifth:["shifted-cube-1", "shifted-cube-1 R"],
    sixth:["h-line", "v-line"],
    seventh:["cube"]
}

export const Block = ({class_, top, left}) => <BLOCK_STRUCTURE style={{ top, left }} class_={class_}/>
let i =-1
/**
 * @returns {string} Random string of an existing block.
 */
export function randBlockName(arg){
    console.log(arg)
    if(arg.includes('dev')){
        i=arg==='dev'?i+1:i-1
        if(i === classes.length){ i=0 }else if(i === -1){i=classes.length-1}
        console.log(i)
        return classes[i]
    }else{
        return classes[randInt(0, classes.length)]
    }
}
// export const randBlockName=(i='')=> typeof i === 'number'?classes[i]:classes[randInt(0, classes.length)]