import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors'
import {AppDataSource} from "./data-source";
import router from "./router/router";
const app = express();
AppDataSource.initialize().then(() => {
    console.log('Connect database success')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("", router)
app.listen(8181, () => {
    console.log('Server is running')
});