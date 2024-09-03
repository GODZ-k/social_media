import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function    ProfileTabs() {
  return (
    <Tabs defaultValue="posts" className=" w-full">
    <TabsList className=" w-full flex justify-evenly">
      <TabsTrigger className=" w-52" value="posts">Posts</TabsTrigger>
      <TabsTrigger className=" w-52" value="videos">Videos</TabsTrigger>
    </TabsList>
    <TabsContent value="posts" className=" bg-black w-full h-full">posts</TabsContent>
    <TabsContent value="videos">videos</TabsContent>
  </Tabs>
  
  )
}

export default ProfileTabs