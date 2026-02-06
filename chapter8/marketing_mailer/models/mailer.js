
import db from "../db.js";

const Lead = db.define("Lead", {
    email: {
        type: db.Sequelize.STRING,
        unique: true,
        validate: {
        isEmail: true
        },
    },
    verified: {
        type: db.Sequelize.BOOLEAN,
        defaultValue: false,
    },
    lastCampaign: {
        type: db.Sequelize.STRING,
    },

},{});

Lead.sync();

export default Lead;


