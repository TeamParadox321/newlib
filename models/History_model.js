const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let History = new Schema({
    user_id: {
        type: String
    },
    book_id: {
        type: String
    },
    borrowed_date: {
        type: Date
    },
    expected_return_date: {
        type: Date
    },
    returned_date: {
        type: Date
    },
    fines: {
        type: Number
    },
    description: {
        type: String
    },
    ref_id: {
        type: String
    }
});

module.exports = mongoose.model('history', History);