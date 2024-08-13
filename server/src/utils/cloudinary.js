import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs/promises";

async function uploadOnCloudinary(filePath) {
  try {

    const imageBuffer = await fs.readFile(filePath);

    // Process the image with sharp
    const optimizedImage = await sharp(imageBuffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 100 })
      .toBuffer();

    const uploadresult = await new Promise((res, rej) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", quality: "auto:best" },
          (error, result) => {
            if (error) {
              rej(new Error("Cloudinary upload error: " + error.message));
            } else {
              res(result);
            }
          }
        )
        .end(optimizedImage);
    });

    if (!uploadresult) {
      await fs.unlink(filePath);
      console.log("failed to upload image");
    }

    await fs.unlink(filePath);

    return uploadresult;

  } catch (error) {
    await fs.unlink(filePath);
    console.log("failed to upload image", error);
  }
}

async function uploadVideoOnCloudinary(filePath) {
  try {
    const optimizedVideoPath = filePath.replace(/\.[^/.]+$/, "-optimized.mp4");

    await new Promise((res, rej) => {
        ffmpeg(filePath)
        .videoCodec("libx264") // Use H.264 codec for video compression
        .audioCodec("aac") // Use AAC codec for audio
        .outputOptions([
            "-vf scale=720:1280",
            "-crf 20", // Constant Rate Factor for high quality
            "-preset medium", // Encoding preset for better quality
            "-movflags +faststart", // Optimize for streaming
        ])
        .on("end", () => res())
        .on("error", (err) => {
            fs.unlink(filePath)
            rej(err)
        })
        .save(optimizedVideoPath);
    });
    
    
    const videoBuffer = await fs.readFile(optimizedVideoPath)
    
    
    const uploadedVideo = await new Promise((res,rej)=>{
        cloudinary.uploader.upload_stream(
            {resource_type:"video", chunk_size: 10000000 },
            (err,result)=>{
                if (err) {
                    fs.unlink(filePath)
                    // fs.unlink(optimizedVideoPath)
                    rej(new Error('Cloudinary upload error: ' + err.message));
                } else {
                    res(result);
                }
            }
        ).end(videoBuffer)
    })

    console.log("start", uploadedVideo)


    if (!uploadedVideo) {
       await fs.unlink(optimizedVideoPath)
       await fs.unlink(filePath);
    }

    await fs.unlink(optimizedVideoPath)
    await fs.unlink(filePath)

    return uploadedVideo

  } catch (error) {
    console.log(error)
    await fs.unlink(optimizedVideoPath)
    await fs.unlink(filePath);
  }
}



export { uploadOnCloudinary , uploadVideoOnCloudinary };
