import React from "react";
import { DialogContent } from "@/components/ui/dialog";
import Searching from "./Searching";

function SearchComp() {
  return (
    <DialogContent isClose={false}>
      <Searching />
    </DialogContent>
  );
}

export default SearchComp;
