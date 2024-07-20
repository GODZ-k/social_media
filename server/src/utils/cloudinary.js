import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'


async function uploadOnCloudinary(filePath) {
    try {
        
        const uploadresult  = await cloudinary.uploader.upload(filePath , {
            resource_type:"auto"
        })

        if(!uploadresult){
            fs.unlinkSync(filePath)
            console.log('failed to upload image')
        }

        fs.unlinkSync(filePath)

        return uploadresult

    } catch (error) {
        fs.unlinkSync(filePath)
        console.log('failed to upload image')
    }
}


export default uploadOnCloudinary