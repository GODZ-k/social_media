import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function TriggerOptions({ children, items , onClick }) {
  return (
    <Dialog className=" w-fit max-w-xl">
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className=" max-w-xs rounded-xl py-2" isClose={false}>
        <div className=" w-full">
          <ul>
            {items?.map((item , index) => (
              <button onClick={onClick} key={index} className={`${item.name === 'Delete' ? 'text-red-600' : 'text-gray-800'} w-full py-2  ${index !== items.length - 1 ? 'border-b border-b-gray-300' : ''} `}>
                <li>{item.name}</li>
              </button>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TriggerOptions;
