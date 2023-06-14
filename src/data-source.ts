import "reflect-metadata"

import {DataSource} from "typeorm";
import * as dotenv from "dotenv";
dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: +process.env.PORTDB,
    username: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASE,
    synchronize: false,
    entities: ["dist/src/entity/*.js"]
})


