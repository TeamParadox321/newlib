const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    user_id: {
        type: String
    },
    user_email: {
        type: String
    },
    user_name: {
        type: String
    },
    user_phone_number:{
        type: String
    },
    user_password: {
        type: String
    },
    user_role:{
        type: String
    },
    user_approved:{
        type: Boolean
    }
});

module.exports = mongoose.model('users', User);