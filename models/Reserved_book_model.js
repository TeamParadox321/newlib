const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReservedBook = new Schema({
    book_id: {
        type: String
    },
    user_id: {
        type: String
    },
    reserved_date: {
        type: Date,
        default: new Date()
    },
    ref_id: {
        type: String,
        default: 'aa'
    }
});

module.exports = mongoose.model('reserved_books', ReservedBook);