const db = require("../models");
const Biodata = db.biodata;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.nama) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create biodata object
    const biodata = {
        nama: req.body.nama,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        alamat: req.body.alamat,
    };

    // Save biodata to database
    Biodata.create(biodata)
           .then (data => {
                res.send(data);
           })
           .catch(err => {
                res.status(500).send({
                    message: "Error occurred while inserting biodata."
                });
            });
};

exports.findAll = (req, res) => {
    Biodata.findAll()
           .then(data => {
                res.send(data)
           })
           .catch(err => {
                res.status(500).send({
                    message: err.message || "Error occurred while retrieving biodata."
                });
           });
};

exports.findOne = (req, res) => {
    Biodata.findOne({
        where: {
            nama: req.params.nama
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while finding biodata."
        });
    });
};

exports.delete = (req, res) => {
    Biodata.destroy({
        where: {
            nama: req.params.nama
        }
    })
    .then(data => {
        res.send({
            message: "Success delete biodata with name = "  + req.params.nama + "!",
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while delete biodata."
        });
    });
};