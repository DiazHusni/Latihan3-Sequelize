const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    'biodata',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(( ) => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const express = require( "express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use( cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/X-ww-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

const db = require("./app/models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

const biodata = require("./app/controllers/biodata.controller.js");

app.post("/create", (req, res) => {
    biodata.create(req, res)
});

app.get("/findAll", (req, res) => {
    biodata.findAll(req, res)
});

app.get("/findOne/:nama", (req, res) => {
    biodata.findOne(req, res)
});

app.post("/delete/:nama", (req, res) => {
    biodata.delete(req, res)
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});