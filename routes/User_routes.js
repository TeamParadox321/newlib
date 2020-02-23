const express = require('express');
const cors = require('cors');
const routes = express.Router();
const app = express();
const User = require('../models/User_model');
const Book = require('../models/Book_model');
const History = require('../models/History_model');
const IssedBooks = require('../models/Issued_book_model');
const ReservedBooks = require('../models/Reserved_book_model');
const Category = require('../models/Category_model');
const Fines = require('../models/Fines_model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
process.env.SECRET_KEY = "secret";
app.use(cors());


routes.route('/').get(function (req, res) {
    User.find(function (err, users) {
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    })
});
routes.route('/statistics').get(function (req, res) {
    let obj = {
        all_books : 0,
        all_reserved_books: 0,
        all_issued_books: 0,
        all_categories: 0,
        all_users : 0,
        all_students : 0,
        books : []
    };
    Book.aggregate( [{
        $group : { _id : null, count : { $sum : 1 }}
    }], function (err, r) {
        if(err){
            console.log(err);
        }else{
            obj.books = r;
        }
    });
    Book.countDocuments(function (err, r) {
        if(err){
            console.log(err);
        }else{
            obj.all_books = r.count;
        }
    });
    ReservedBooks.count(function (err, r) {
        if(err){
            console.log(err);
        }else{
            obj.all_reserved_books = r;
        }
    });
    IssedBooks.count(function (err, r) {
        if(err){
            console.log(err);
        }else{
            obj.all_issued_books = r;
        }
    });
    User.count(function (err, r) {
        if(err){
            console.log(err);
        }else{
            obj.all_users = r;
        }
    });
    res.json(obj);
});
routes.route('/histories').post(function (req, res) {
    if(req.body.token!=null){
        var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
        User.findOne({
            user_id: decoded.user_id
        })
            .then(user=> {
                if (user) {
                    History.find(function (err, histories) {
                        if(err){
                            console.log(err);
                        }else{
                            res.json(histories);
                        }
                    })
                }
            })
            .catch(err=>{
                res.send(err);
            });
    }

});

routes.route('/fines').post(function (req, res) {
    if(req.body.token!=null){
        var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
        User.findOne({
            user_id: decoded.user_id
        })
            .then(user=> {
                if (user) {
                    Fines.find(function (err, fines) {
                        if(err){
                            console.log(err);
                        }else{
                            res.json(fines);
                        }
                    })
                }
            })
            .catch(err=>{
                res.send(err);
            });
    }
});

routes.route('/history').post(function (req, res) {
    if(req.body.token!=null){
        var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
        User.findOne({
            user_id: decoded.user_id
        })
            .then(user=> {
                if (user) {
                    History.find({user_id:decoded.user_id},function (err, histories) {
                        if(err){
                            console.log(err);
                        }else{
                            res.json(histories);
                        }
                    })
                }
            })
            .catch(err=>{
                res.send(err);
            });
    };

});

routes.route('/new_students').get(function (req, res) {
    User.find({ user_approved: false }, function (err, users) {
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    })
});
routes.route('/approve').post(function (req, res) {
    if(req.body.token!=null){
        var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
        User.findOne({
            user_id: decoded.user_id
        })
            .then(user=>{
                if(user){
                    User.findById(req.body.id, function (err, u) {
                        if (u) {
                            u.user_approved = true;
                            u.save();
                            let f = new Fines({
                                user_id : u.user_id,
                                user_fines : 0
                            });
                            f.save();
                            res.send('Student was approved successfully');
                        }
                    });
                }else{
                    res.send('You should sign in first');
                }
            })
            .catch(err=>{
                res.send(err);
            })
    }
});

routes.route('/remove_new_students').post(function (req, res) {
    if(req.body.token!=null){
        var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
        User.findOne({
            user_id: decoded.user_id
        })
            .then(user=>{
                if(user){
                    User.deleteOne({
                        _id:req.body.id
                    }, function (err, u) {
                        if (err) {
                            res.send(err);
                        }else{
                            res.send('Student was removed successfully');
                        }
                    });
                }else{
                    res.send('You should sign in first');
                }
            })
            .catch(err=>{
                res.send(err);
            })
    }
});

routes.route('/profile').post(function (req, res) {
    if(req.body.token!=null){
        var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
        User.findOne({
            user_id: decoded.user_id
        })
            .then(user=>{
                if(user){
                    res.send(user);
                }
            })
            .catch(err=>{
                res.send(err);
            })
    }
});

routes.route('/check').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.findOne({
        user_id: decoded.user_id
    })
        .then(user=>{
            if(user){
                res.send(true);
            }else{
                res.send(false);
            }
        })
        .catch(err=>{
            res.send(false);
        })
});

routes.route('/user_login').post(function (req,res) {
    User.findOne({
        user_id:req.body.user_id
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.user_password, user.user_password)){
                    const payload = {
                        _id: user._id,
                        user_id: user.user_id
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 144000
                    });
                    res.send({token: token, role: user.user_role, id: user.user_id})
                } else {
                    res.send("Password does not match");
                }
            } else {
                res.send("User doesnot exist")
            }
        })
        .catch(err => {
            res.send('error ' + err)
        })
});
routes.route('/add_student').post(function (req,res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.findOne({
        user_id: decoded.user_id
    })
        .then(user=> {
            if(user){
                User.findOne({
                    user_id:req.body.user_id
                })
                    .then(user => {
                        if(!user){
                            bcrypt.hash(req.body.user_password, 10, (err, hash) => {
                                let usr = new User({
                                    user_id: req.body.user_id,
                                    user_name: req.body.user_name,
                                    user_email: req.body.user_email,
                                    user_phone_number: req.body.user_phone_number,
                                    user_password: hash,
                                    user_role: req.body.user_role,
                                    user_approved: req.body.user_approved
                                });
                                if(req.body.user_role==='student'){
                                    let f = new Fines({
                                        user_id : req.body.user_id,
                                        user_fines : 0
                                    });
                                    f.save();
                                }
                                usr.save()
                                    .then(user => {
                                        res.status(200).send('User was added successfully...');
                                    })
                                    .catch(err=>{
                                        res.status(400).send('Adding new user was failed...');
                                    });
                            })
                        }else {
                            res.send('The user is already exists...')
                        }
                    })
            }
        })
        .catch(err=>{
            res.send(err);
        })
});

routes.route('/user_signup').post(function (req,res) {
    User.findOne({
        user_id:req.body.user_id
    })
        .then(user => {
            if(!user){
                bcrypt.hash(req.body.user_password, 10, (err, hash) => {
                    let usr = new User({
                        user_id: req.body.user_id,
                        user_name: req.body.user_name,
                        user_email: req.body.user_email,
                        user_phone_number: req.body.user_phone_number,
                        user_password: hash,
                        user_role: 'student',
                        user_approved: false
                    });
                    usr.save()
                        .then(user => {
                            res.status(200).send('Student was registered successfully...');
                        })
                        .catch(err=>{
                            res.status(400).send('adding new Student failed...');
                        });
                })
            }else {
                res.send('The student is already exists...')
            }
        })
});

routes.route('/reserved_books').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    ReservedBooks.find({
        user_id: decoded.user_id
    }).then(books=>{
        if(books){
            res.json(books)
        }
    });
});
routes.route('/borrowed_books').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    IssedBooks.find({
        user_id: decoded.user_id
    }).then(books=>{
        if(books){
            res.json(books)
        }
    });
});
routes.route('/user_profiles').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.find({
        user_id: decoded.user_id
    })
        .then(user => {

        })
        .catch(err => {
            res.send(err);
        });
});
routes.route('/fine').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.find({
        user_id: decoded.user_id
    })
        .then(user => {
            Fines.findOne({user_id : decoded.user_id})
                .then(fine=>{
                    res.send(fine.user_fines);
                })
                .catch(err=>{
                    res.send(err);
                });
        })
        .catch(err => {
            res.send(err);
        });
});
routes.route('/delete_book').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.findOne({
        user_id: decoded.user_id
    })
        .then(user=> {
            Book.deleteOne({
                book_id:req.body.book_id
            })
                .then(book=>{
                    res.send('Successfully deleted.');
                })
                .catch(err=>{
                    res.send(err);
                });
        })
        .catch(err=>{
            res.send(err);
        });
});
routes.route('/delete_user').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.findOne({
        user_id: decoded.user_id
    })
        .then(user=> {
            User.deleteOne({
                user_id:req.body.user_id
            })
                .then(user=>{
                    res.send('Successfully deleted.');
                })
                .catch(err=>{
                    res.send(err);
                });
        })
        .catch(err=>{
            res.send(err);
        });
});

routes.route('/change_password').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.findOne({
        user_id: decoded.user_id
    })
        .then(user=> {
            if(bcrypt.compareSync(req.body.user_password, user.user_password)){
                bcrypt.hash(req.body.new_user_password, 10, (err, hash) => {
                    if(err){
                        res.send(err);
                    }else{
                        user.user_password = hash;
                        user.save()
                            .then(u => {
                                res.send('Password was changed successfully...');
                            })
                            .catch(e=>{
                                res.send('Changing password was failed...');
                            });
                    }
                })
            }else{
                res.send('Old password is incorrect.');
            }
        })
        .catch(err=>{
            res.send(err);
        })
});

routes.route('/add_category').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.find({
        user_id: decoded.user_id
    })
        .then(user=> {
            if (user) {
                Category.findOne({
                    book_category: req.body.category
                })
                    .then(c=>{
                        if(!c){
                            let cat = new Category(
                                {
                                    book_category : req.body.category
                                }
                            );
                            cat.save()
                                .then(cate=>{
                                    res.status(200).send('New category was added successfully...');
                                })
                                .catch(err=>{
                                    res.status(400).send('Adding new Category failed...');
                                });
                        }else{
                            res.send('Category is already exist');
                        }
                    }).catch(e=>{
                        res.send(e);
                    });
            }else{
                res.send("You should sign in first");
            }
        })
        .catch(err=>{
            res.send(err);
        })
});

routes.route('/all_reserved_books').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.find({
        user_id: decoded.user_id
    })
        .then(user=>{
            if(user){
                ReservedBooks.find(function (err, books) {
                    if(err){
                        console.log(err);
                    }else{
                        res.json(books);
                    }
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
});

routes.route('/reserve').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.findOne({
        user_id: decoded.user_id
    }).then(user=>{
        if(user){
            if(user.user_approved===true){
                ReservedBooks.findOne({
                    book_id: req.body.book_id
                }).then(book=>{
                    if(!book){
                        var date = new Date();
                        //date.replace("IST", "SLST");
                        let b = new ReservedBooks({
                            book_id: req.body.book_id,
                            user_id: decoded.user_id,
                            ref_id: req.body.ref_id,
                            reserved_date: date
                        });
                        Book.findById(req.body.ref_id, function (err, bk) {
                            if (bk) {
                                bk.book_availability = false;
                                bk.save();
                            }
                        });
                        b.save()
                            .then(user => {
                                res.send('Reserved successfully...');
                            })
                            .catch(err=>{
                                res.send('Reserving failed...');
                            });
                    }else {
                        res.send('The book is already reserved...');
                    }
                });
            }else{
                res.send("Your account has not been approved yet");
            }

        }else{
            res.send('You should sign in first');
        }
    })
});

routes.route('/issue').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.findOne({
        user_id: decoded.user_id
    }).then(user=>{
        if(user){
            ReservedBooks.deleteOne({
                book_id: req.body.book_id
            },
                function (err, obj) {
                    if(err){
                        console.log(err)
                    }else{
                        var date = new Date();
                        date.setDate(date.getDate() + 14);
                        let issue = new IssedBooks({
                            book_id: req.body.book_id,
                            user_id: req.body.user_id,
                            ref_id: req.body.ref_id,
                            issued_date: new Date(),
                            expected_return_date: date
                        });
                        issue.save()
                            .then(user => {
                                res.send('Issued successfully...');
                            })
                            .catch(err=>{
                                res.send('Issuing failed...');
                            });
                    }
                })
        }
    })
});

routes.route('/cancel').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.findOne({
        user_id: decoded.user_id
    }).then(user=>{
        if(user){
            ReservedBooks.deleteOne({
                    book_id: req.body.book_id
                },
                function (err, obj) {
                    if(err){
                        console.log(err)
                    }else{
                        Book.findById(req.body.ref_id, function (err, bk) {
                            if (bk) {
                                bk.book_availability = true;
                                bk.save().then(()=>{
                                    res.send("Cancelled successfully..")
                                }).catch(err=>{
                                    res.send(err)
                                });
                            }else{
                                res.send('Book does not exist..')
                            }
                        });
                    }
                })
        }
    })
});

routes.route('/all_issued_books').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.find({
        user_id: decoded.user_id
    })
        .then(user=>{
            if(user){
                IssedBooks.find(function (err, books) {
                    if(err){
                        console.log(err);
                    }else{
                        res.json(books);
                    }
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
});

routes.route('/return').post(function (req, res) {
    var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    User.findOne({
        user_id: decoded.user_id
    }).then(user=>{
        if(user){
            IssedBooks.deleteOne({
                    book_id: req.body.book_id
                },
                function (err, obj) {
                    if(err){
                        console.log(err)
                    }else{
                        var time = new Date() - req.body.expected_return_date;
                        var days = time / (1000 * 3600 * 24);
                        console.log(days);
                        var fines = time>0 ? Math.floor(days)*5 : 0;
                        var description = time>0 ? 'Late '+Math.floor(days)+' days to return the book': '';
                        let his = new History({
                            user_id: req.body.user_id,
                            book_id: req.body.book_id,
                            borrowed_date: req.body.issued_date,
                            expected_return_date: req.body.expected_return_date,
                            ref_id: req.body.ref_id,
                            returned_date: new Date(),
                            fines: fines,
                            description: description
                        });
                        Fines.findOne({
                            user_id: req.body.user_id
                        })
                            .then(f=>{
                                f.user_fines = f.user_fines+fines;
                            }).catch(err=>{
                                console.log(err);
                            });
                        History.findOne({
                            user_id : his.user_id,
                            book_id : his.book_id,
                            borrowed_date: his.borrowed_date
                        }).then(h=>{
                            if(!h){
                                his.save()
                                    .then(() => {
                                        Book.findById(req.body.ref_id, function (err, bk) {
                                            if (bk) {
                                                bk.book_availability = true;
                                                bk.save()
                                                    .then(()=>{
                                                        res.send('Returned successfully...');
                                                    })
                                                    .catch(err=>{
                                                        res.send(err)
                                                    });
                                            }
                                        });
                                    })
                                    .catch(err=>{
                                        res.send(err);
                                    });
                            }else{
                                res.send('The book is already returned')
                            }
                        }).catch(err=>{
                            res.send(err);
                        })
                    }
                })
        }else{
            res.send('You have not signed into the system..')
        }
    })
});
routes.route('/:id').get(function(req,res){
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    })
});

module.exports = routes;