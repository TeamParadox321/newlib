const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Fines = new Schema({
    user_id: {
        type: String
    },
    user_fines : {
        type: Number
    }
});

module.exports = mongoose.model('fines', Fines);