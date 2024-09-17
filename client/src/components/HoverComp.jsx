import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function HoverComp({content,children , className , contentClass}) {
  return (
    <HoverCard isOpen={true} className={`${className}`}>
      <HoverCardTrigger>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className={contentClass}>
       {content}
      </HoverCardContent>
    </HoverCard>
  );
}

export default HoverComp;
