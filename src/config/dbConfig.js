import mongoose from "mongoose"

export function dbConnection(URL) {
    return mongoose.connect(URL).then(() => {
        console.log(`DB connected successfully`);
    }).catch(err => {
        console.log(`Error in DB`);
        process.exit(1);
    }
    )
}