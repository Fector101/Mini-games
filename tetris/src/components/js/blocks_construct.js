import React from "react"
export const blocks = {
        length:3,
        keys:['i','o','clockwise_l'],        
        i:(top,left)=>(<div style={{top,left}} className="block i-block">
                            <div></div><div></div><div></div><div></div>
                        </div>),
        o:(top,left)=>(<div style={{top,left}} className="block o-block">
            <div></div><div></div><div></div><div></div>
        </div>),
        
        clockwise_l:(top,left)=>(<div style={{top,left}} className="block z-block">
            <div></div><div></div>
            <div></div><div></div>
        </div>)
        }

