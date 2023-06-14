import "reflect-metadata"

import {DataSource} from "typeorm";
require('dotenv').config();


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: +process.env.PORTDB,
    username: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASE,
    synchronize: true,
    entities: ["dist/src/entity/*.js"]
})


