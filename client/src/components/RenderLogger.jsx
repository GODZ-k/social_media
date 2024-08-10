import { useRef } from "react";

function useRenderLogger() {
  const renders = useRef(0);
  renders.current += 1;
  console.log(`Component rendered ${renders.current} times`);
}

export default useRenderLogger;
