

import app from "./app";
import config from "./app/config";
import mongoose, { model } from "mongoose";

async function server() {
    try{

        await mongoose.connect(config.database_url as string);
        // ----------mongodb connect--------

      app.listen(config.port,()=>{
console.log(`server is running at http://localhost:${config.port}`)
      })
    }catch (error) {
      console.error('Error starting the application:', error);
  }
    
}
server();