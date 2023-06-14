import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors'
import {AppDataSource} from "./data-source";
import router from "./router/router";
require('dotenv').config();


const app = express();

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(cors());
app.use("", router)
app.listen(process.env.PORT || 8181, () => {
    console.log(`Server is running on  port ${process.env.PORT}`)
});
