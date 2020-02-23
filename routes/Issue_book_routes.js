const express = require('express');
const cors = require('cors');
const routes = express.Router();
const app = express();
const Book = require('../models/Book_model');
const History = require('../models/History_model');
const IssedBooks = require('../models/Issued_book_model');
const ReservedBooks = require('../models/Reserved_book_model');
app.use(cors());


routes.route('/issue_book').post(function (req,res) {
    IssedBooks.findOne({
        book_id: req.body.book_id
    })
        .then(book => {
            if(!book){
                let issue = new IssedBooks(req.body);
                issue.save()
                    .then(user => {
                        res.status(200).json({'user': 'User added successfully '});
                    })
                    .catch(err=> {
                        res.status(400).send('adding new User failed');
                    });
            }
        })
});

module.exports = routes;