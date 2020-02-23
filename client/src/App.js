import React, {Component} from 'react';
import { BrowserRouter as Router, Route,Switch, Link} from "react-router-dom";
import axios from "axios";
import "./components/Frontend/DesignComponents/style.css";
import IM from "./components/Frontend/DesignComponents/uoklogo.png";
import IM2 from "./components/Frontend/DesignComponents/user.png";

import Home from './components/Frontend/DesignComponents/Home';
import UserLogin from "./components/Frontend/UserComponents/UserLogin";
import Signup from "./components/Frontend/UserComponents/Signup";
import InventoryBooks from "./components/Frontend/AdminComponents/InventoryBooks";
import Users from "./components/Frontend/AdminComponents/Users";
import Books from "./components/Frontend/UserComponents/Books";
import AllBooks from "./components/Frontend/UserComponents/AllBooks";
import Profile from "./components/Frontend/DesignComponents/Profile";
import Book from "./components/Frontend/UserComponents/Book";
import ReservedBooks from "./components/Frontend/UserComponents/ReservedBooks";
import AllReservedBooks from "./components/Frontend/AdminComponents/AllReservedBooks";
import AllIssuedBooks from "./components/Frontend/AdminComponents/AllIssuedBooks";
import BorrowedBooks from "./components/Frontend/UserComponents/BorrowedBooks";
import Histories from "./components/Frontend/AdminComponents/Histories";
import NewStudents from "./components/Frontend/AdminComponents/NewStudents";
import History from "./components/Frontend/UserComponents/History";
import AboutUs from './components/Frontend/DesignComponents/AboutUs';
import UserProfile from "./components/Frontend/AdminComponents/UserProfile";
import Fines from "./components/Frontend/AdminComponents/Fines";

class App extends Component{
    constructor(props){
        super(props);
        this.nullState = this.nullState.bind(this);
        this.fullState = this.fullState.bind(this);
        this.hideSignIn = this.hideSignIn.bind(this);
        if(localStorage.usertoken!=null) {
            axios.post('/users/check', {
                token: localStorage.usertoken
            })
                .then(response => {
                    if (response.data) {
                        this.fullState();
                    } else {
                        this.nullState();
                    }

                })
                .catch(function (error) {
                    localStorage.removeItem("usertoken");
                    localStorage.removeItem("userrole");
                    localStorage.removeItem("userid");
                    alert(error);
                });
        }
        this.state = {
            token: localStorage.usertoken,
            id: localStorage.userid,
            role: localStorage.userrole
        };
    }
    componentDidMount(){
        this.setState({
            token: localStorage.usertoken,
            id: localStorage.userid,
            role: localStorage.userrole,
            sideBar : true
        })
    }
    nullState(){
        this.setState({
            token: null,
            id: null,
            role: null
        })
    }
    fullState(){
        this.setState({
            token: localStorage.usertoken,
            id: localStorage.userid,
            role: localStorage.userrole
        })
    }

    hideSignIn(){
        ('#signIn').modal("hide");
    }
    render() {
        return (
            <dev>
                <Router>
                    <header>
                        <nav style={{"background": "#400000", "min-height": "70px", "min-width": "390px"}} className="navbar navbar-expand-md navbar-dark">

                            <img alt={"Logo UOK"} src={IM} className={"navbar-brand"} width={"48px"} height={"55px"}/>
                            <Link className="navbar-brand" to={"/"}>Library Management System</Link>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/books" className="nav-link">Books</Link>
                                    </li>
                                    {localStorage.userrole==='librarian' ?
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/students">Users</Link>
                                        </li> : ''
                                    }
                                    {localStorage.userrole==='librarian' ?
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/new_students">New Students</Link>
                                        </li> : ''
                                    }
                                </ul>
                                <ul className="navbar-nav">
                                    {localStorage.usertoken == null ?
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="modal" data-target="#signUp">Sign
                                                Up</a>
                                        </li> : ''
                                    }
                                    {localStorage.usertoken == null ?
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="modal" data-target="#signIn">Sign In</a>
                                        </li>: ''
                                    }

                                    {this.state.token != null ?
                                        <li className="nav-item text-light ">
                                            <Link className={"nav-link"} to={"/profile"}>{localStorage.userid} <img height={"25px"} width={"25px"} src={IM2}/></Link>
                                        </li> : ''
                                    }
                                    {this.state.token != null ?
                                        <li className="nav-item">
                                            <a className="nav-link" onClick={() => {
                                                localStorage.removeItem("usertoken");
                                                localStorage.removeItem("userrole");
                                                localStorage.removeItem("userid");
                                                this.nullState();
                                            }}>Sign Out</a>
                                        </li> : ''
                                    }
                                </ul>
                            </div>
                        </nav>
                    </header>
                    <section style={{"min-height": "700px"}}>
                        <Switch>
                            <Route path={"/"} exact={""} component={Home}/>
                            <Route path={"/all_books"} render={() => <AllBooks/>}/>
                            <Route path={"/book/:id"} component={Book}/>
                            <Route path={"/books"} component={Books}/>
                            <Route path={"/about"} component={AboutUs}/>
                            {localStorage.usertoken!=null ? <wrapper>
                                <Route path={"/profile"} component={Profile}/>
                                <Route path={"/students"} component={Users}/>
                                <Route path={"/inventory_books"} component={InventoryBooks}/>
                                <Route path={"/borrowed_books"} component={BorrowedBooks}/>
                                <Route path={"/reserved_books"} component={ReservedBooks}/>
                                <Route path={"/all_reserved_books"} component={AllReservedBooks}/>
                                <Route path={"/all_issued_books"} component={AllIssuedBooks}/>
                                <Route path={"/histories"} component={Histories}/>
                                <Route path={"/new_students"} component={NewStudents}/>
                                <Route path={"/history"} component={History}/>
                                <Route path={"/users/:id"} component={UserProfile}/>
                                <Route path={"/all_fines"} component={Fines}/>
                            </wrapper> : '' }
                        </Switch>
                    </section>
                    <footer style={{"background":"#400000", "height" : "50px", "padding-top": "15px", "min-width": "390px"}} className="text-light">
                        <center><h6 className={"footer-text"}>@ Team Paradox</h6></center>
                    </footer>
                </Router>
                <div className="container">
                    <div className="modal close" id="signUp" data-dismiss="modal">
                        <div>
                            <Signup/>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="modal close" id="signIn" data-dismiss="modal">
                        <div>
                            <UserLogin fs={this.fullState} hide={this.hideSignIn}/>
                        </div>
                    </div>
                </div>
            </dev>
        );
    }
}

export default App;


