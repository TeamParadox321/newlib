const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Category = new Schema({
    book_category: {
        type: String
    }
});

module.exports = mongoose.model('categories', Category);