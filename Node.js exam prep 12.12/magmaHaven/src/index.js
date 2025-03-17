import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import 'dotenv/config';

import routes from "./routes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();

// Setup DB
const url = 'mongodb://127.0.0.1:27017';
mongoose.connect(url, {dbName: "volcanoes"}) //TODO: Change DB name
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log('DB connection error', err));

// View engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
}));
app.set('views', './src/views');
app.set('view engine', 'hbs');

// Static middleware
app.use('/static', express.static('src/public'));

// Body parser
app.use(express.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());
app.use(authMiddleware)

app.use(routes)

app.listen(5000, () => console.log('Listening on http://localhost:5000'));

