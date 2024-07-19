import app from "./src/app.js";
import connectDB from "./src/connection/connection.js";

const port =  process.env.PORT

connectDB()
.then(()=>{
    app.listen(port , ()=>{
        console.log(`listning on port ${port}`)
    })
}).catch((err)=>{
    console.log(`Error listning on port ${port} : ${err}`)
})


