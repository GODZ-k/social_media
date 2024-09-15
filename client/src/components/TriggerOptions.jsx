import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CircularProgress } from "@chakra-ui/react";
import MiniLoader from "./MiniLoader";

function TriggerOptions({ children, items ,loading   }) {

  const [isOpen, setIsOpen] = useState(false);

  // Close the dialog when loading becomes false
  useEffect(() => {
    if (!loading) {
      setIsOpen(false);
    }
  }, [loading]);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}  className=" w-fit max-w-xl">
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className=" max-w-xs rounded-xl py-2" isClose={false}>
       {loading ? (
        <MiniLoader/>
       ):(
        <div className=" w-full">
        <ul>
          {items?.map((item , index) => (
            <button onClick={item.onClick} key={index} className={`${item.name === 'Delete' ? 'text-red-600' : 'text-gray-800'} w-full py-2 hover:bg-gray-50  ${index !== items.length - 1 ? 'border-b border-b-gray-300' : ''} `}>
              <li>{item.name}</li>
            </button>
          ))}
        </ul>
      </div>
       )}
      </DialogContent>
    </Dialog>
  );
}

export default TriggerOptions;
