const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(
    'biodata',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = (sequelize, Sequelize) => {
    const biodata = sequelize.define("biodata", {
        nama: {
        type: DataTypes.STRING,
        allowNull: false
        },
        tempat_lahir: {
        type: DataTypes.STRING,
        allowNull: false
        },
        tanggal_lahir: {
        type: DataTypes.DATEONLY,
        },
        alamat: {
        type: DataTypes.STRING,
        allowNull: false
        }
    });

    return biodata;
}