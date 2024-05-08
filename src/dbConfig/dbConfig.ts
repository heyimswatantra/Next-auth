import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log("MongoDB Connected")
        })

        connection.on('error', (err) => {
            console.log("Mongodb Connection error, please make sure DB is up and running: " + err);
            process.exit(1);
        })
        
    } catch (error) {
        console.log("Something went wrong while connecting to DB");
        console.log(error);
        
    }
}