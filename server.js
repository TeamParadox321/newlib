const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const usrRoutes = require('./routes/User_routes');
const bookRoutes = require('./routes/Book_routes');
const issuedBookRoutes = require('./routes/Issue_book_routes');
const path = require('path');


app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/library_management_system', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).catch(err => {
    console.log("db error " + err.message);
});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB connection established successfully ");
});

app.use('/books', bookRoutes);
app.use('/users', usrRoutes);
app.use('/issued_books', issuedBookRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(client / build));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.listen(PORT, function () {
    console.log("Server is running on Port : " + PORT);
});