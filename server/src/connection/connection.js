import mongoose from 'mongoose'



const connectDB =  async()=>{
    await mongoose.connect('mongodb+srv://tanmay:JxeWoxyj5lupYhKM@cluster0.theurha.mongodb.net/social_media').then((res)=>{
        console.log(`Database is connected on host ${res.connection.host}`)
    }).catch((err)=>{
        console.log('Error listning on host ')
    })
}


export default connectDB