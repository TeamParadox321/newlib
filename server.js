const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const usrRoutes = require('./routes/User_routes');
const bookRoutes = require('./routes/Book_routes');
const issuedBookRoutes = require('./routes/Issue_book_routes');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/library_management_system' , { useUnifiedTopology: true, useNewUrlParser: true}).catch(err=>{
  console.log("db error "+ err.message);
});
const connection = mongoose.connection;

connection.once('open', function () {
  console.log("MongoDB connection established successfully ");
});

app.use('/books', bookRoutes);
app.use('/users', usrRoutes);
app.use('/issued_books',issuedBookRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port : " + PORT);
});