"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./data-source");
const app = (0, express_1.default)();
const hostname = '127.0.0.1';
const port = 8181;
const FE_SERVER_PORT = 3000;
data_source_1.AppDataSource.initialize().then(() => {
    console.log('Connect database success');
});
app.use((0, cors_1.default)({
    origin: `http://${hostname}:${FE_SERVER_PORT}`,
    credentials: true
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=index.js.map