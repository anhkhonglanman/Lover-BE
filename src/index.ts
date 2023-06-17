import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors'
import {AppDataSource} from "./ormconfig";
import router from "./router/router";
require('dotenv').config();
const passport = require('passport');



const app = express();
// Passport middleware
app.use(passport.initialize());
// Passport config
require('./middleware/passport')(passport);

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
