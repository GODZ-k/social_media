import { io } from "./socket.js";
import { server} from "./src/app.js";
import connectDB from "./src/connection/connection.js";
import cluster from 'cluster'
import os from 'os'

const port = process.env.PORT || 4000
const cpuCount = os.cpus().length

console.log("running")

if (cluster.isMaster) {
    console.log(`Master process is running with PID: ${process.pid}`);

    for (let i = 0; i < cpuCount; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        cluster.fork();
    })

    process.on('SIGTERM', () => {
        for (const id in cluster.workers) {
            cluster.workers[id].kill();
        }
        setTimeout(() => {
            process.exit(0);
        }, 5000); 
    });


} else {
    connectDB()
        .then(() => {
           const httpserver =  server.listen(port, () => {
                console.log(`listning on port ${port}`)
            })

            process.on('SIGTERM', () => {
                httpserver.close(() => {
                    io.close(()=>{
                        process.exit();
                    })
                });
            });

             // Allow worker to listen for shutdown message from master
             process.on('message', (msg) => {
                if (msg === 'shutdown') {
                    httpserver.close(() => process.exit());
                }
            });


        }).catch((err) => {
            console.log(`Error listning on port ${port} : ${err}`)
            process.exit(1)
        })
}


