import "dotenv/config"
import { app } from "./infra/http/server";
import { Database } from "./infra/database/database";

Database.connect()

app.listen(process.env.PORT, () => { console.log("server is running")})