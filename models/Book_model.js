const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Book = new Schema({
    book_id: {
        type: String
    },
    book_isbn: {
        type: String
    },
    book_title: {
        type: String
    },
    book_edition:{
        type: String
    },
    book_category: {
        type: String
    },
    book_author: {
        type: String
    },
    book_year: {
        type: String
    },
    book_availability: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('books', Book);