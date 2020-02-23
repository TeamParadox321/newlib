const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let IssuedBook = new Schema({
    book_id: {
        type: String
    },
    user_id: {
        type: String
    },
    issued_date: {
        type: Date
    },
    expected_return_date: {
        type: Date
    },
    ref_id: {
        type: String
    }
});
module.exports = mongoose.model('issued_books', IssuedBook);