import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function HoverComp({content,children , className}) {
  return (
    <HoverCard className={className}>
      <HoverCardTrigger>
        {children}
      </HoverCardTrigger>
      <HoverCardContent>
       {content}
      </HoverCardContent>
    </HoverCard>
  );
}

export default HoverComp;
