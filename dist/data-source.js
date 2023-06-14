"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
require('dotenv').config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: +process.env.PORTDB,
    username: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASE,
    synchronize: true,
    entities: ["dist/entity/*.js"]
});
//# sourceMappingURL=data-source.js.map