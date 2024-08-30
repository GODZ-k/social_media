import { Flex, Image, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  const headerItem = [
    {
      icon: "https://cdn.lordicon.com/kkvxgpti.json",
      to: "/search",
    },
    {
      icon: "https://cdn.lordicon.com/fdxqrdfe.json",
      to: "/chat",
    },
  ];
  return (
    <Flex
      className=" shadow-md"
      justifyContent={"space-between"}
      bg={"white"}
      position={"fixed"}
      top={0}
      left={0}
      zIndex={10}
      width={"100%"}
      paddingX={4}
      paddingY={2}
    >
      <Image
        src="logo.png"
        alt="logo"
        width={100}
        cursor={"pointer"}
        onClick={toggleColorMode}
      />
      <div className=" flex items-center">
        <div className=" flex gap-5">
          {headerItem.map((item) => (
           <Link to={item.to}>
            <lord-icon
              src={item.icon}
              trigger="in"
              delay="1000"
              style={{ width: "30px", height: "30px" }}
              state="in-home"
            ></lord-icon></Link>
          ))}
        </div>
      </div>
    </Flex>
  );
}

export default Header;
