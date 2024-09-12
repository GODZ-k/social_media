import React, { memo } from "react";
import { Input, Signin } from "../components";

import useRenderLogger from "../components/RenderLogger";

const Signin_page = memo(() => {

  useRenderLogger()

  return (
  <Signin/>
  );
})

export default Signin_page;
