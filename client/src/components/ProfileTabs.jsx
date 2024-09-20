import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostsTab from './PostsTab'

function ProfileTabs({posts}) {
  // console.log(' post data ====> ',posts)
  return (
    <Tabs defaultValue="posts" className=" flex justify-between flex-col items-center w-full">
    <TabsList className=" w-full flex justify-evenly">
      <TabsTrigger className=" w-52" value="posts">Posts</TabsTrigger>
      <TabsTrigger className=" w-52" value="videos">Videos</TabsTrigger>
    </TabsList>
    <TabsContent value="posts" className=" w-full h-full">
      <PostsTab posts={posts} type={"image"}/>
    </TabsContent>
    <TabsContent value="videos" className=" w-full h-full">
      <PostsTab posts={posts} className={" !h-40 sm:!h-48 md:!h-56 lg:!h-60"} type={"video"}/>
    </TabsContent>
  </Tabs>
  
  )
}

export default ProfileTabs