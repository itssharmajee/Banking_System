import { app } from "./app.js";
import dotenv from "dotenv";
import { dbConnection } from "./src/config/dbConfig.js";
dotenv.config();
const port = process.env.PORT || 5000;

function serverStart() {
    app.listen(port, () => {
        console.log(`Server is listening on PORT ${port}`);
        dbConnection(process.env.MONGO_URI);

    }
    )
}

serverStart();