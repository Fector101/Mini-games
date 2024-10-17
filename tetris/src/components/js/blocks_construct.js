import React from "react";
import { randInt } from "./helper";

export function BLOCK_STRUCTURE({style,class_}){
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
const classes = [ 
    "h-line", "v-line", "cube", "clockwise-l",
     "anti-cw-l", "letter-t", "t-180 letter-t", "right-arm clockwise-l",
     "left-arm anti-cw-l", "letter-z", "bad-z", "shifted-cube", 
     "shifted-cube-1", "sword"
]
export const Block = ({class_, top, left}) => <BLOCK_STRUCTURE style={{ top, left }} class_={class_}/>

/**
 * @returns {string} Random string of an existing block.
 */
export const randBlockName=()=> classes[randInt(0, classes.length)]