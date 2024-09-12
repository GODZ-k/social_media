import React from "react";
import { toast } from "sonner";

// function Toast({ msg }) {
//   return toast(msg);
// }

// export default Toast;

function Toast(msg){
   <Toaster msg={msg}/>
}


function Toaster(msg){
    return toast(msg)
}

export default Toast