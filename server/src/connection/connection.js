import mongoose from 'mongoose'


const DATABASE_STRING = `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`

const connectDB =  async()=>{
    await mongoose.connect(DATABASE_STRING).then((res)=>{
        console.log(`Database is connected on host ${res.connection.host}`)
    }).catch((err)=>{
        console.log('Error listning on host ')
        process.exit(1)
    })
}


export default connectDB