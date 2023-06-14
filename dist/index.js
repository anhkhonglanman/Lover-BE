"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./data-source");
const router_1 = __importDefault(require("./router/router"));
require('dotenv').config();
const app = (0, express_1.default)();
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("", router_1.default);
app.listen(process.env.PORT || 8181, () => {
    console.log(`Server is running on  port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map