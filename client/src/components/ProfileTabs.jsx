import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostsTab from './PostsTab'
import VideoTab from './VideoTab'

function    ProfileTabs() {
  return (
    <Tabs defaultValue="posts" className=" flex justify-between flex-col items-center w-full">
    <TabsList className=" w-full flex justify-evenly">
      <TabsTrigger className=" w-52" value="posts">Posts</TabsTrigger>
      <TabsTrigger className=" w-52" value="videos">Videos</TabsTrigger>
    </TabsList>
    <TabsContent value="posts" className=" w-    h-full">
      <PostsTab/>
    </TabsContent>
    <TabsContent value="videos">
      <VideoTab/>
    </TabsContent>
  </Tabs>
  
  )
}

export default ProfileTabs