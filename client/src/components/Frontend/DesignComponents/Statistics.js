import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Book = props => (
    <tr>
        <td> <Link to={'/book/'+props.book._id}>{props.book.book_id}</Link>  </td>
        <td> {formatDate(props.book.issued_date)} </td>
        <td> {formatDate(props.book.expected_return_date)} </td>
    </tr>
);
export default class Statistics extends Component{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            all_books: 0,
            all_reserved_books : 0,
            all_issued_books : 0,
            all_categories : 0
        };
    }
    componentDidMount(){
        axios.post('/users/statistics', {token:localStorage.usertoken})
            .then(response=>{
                this.setState({
                    books: response.data.books,
                    all_categories : response.data.all_categories,
                    all_books: response.data.all_books,
                    all_reserved_books : response.data.all_reserved_books,
                    all_issued_books : response.data.all_issued_books
                })
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    componentDidUpdate(){
        axios.get('/users/statistics', )
            .then(response=>{
                this.setState({
                    books: response.data.books,
                    all_categories : response.data.all_categories,
                    all_books: response.data.all_books,
                    all_reserved_books : response.data.all_reserved_books,
                    all_issued_books : response.data.all_issued_books
                })
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    bookList(){
        return this.state.books.map(function (currentBook, i) {
            return <Book book={currentBook} key={i} />
        })
    }
    render(){
        return (
            <div className="container" style={{"padding-top":"10px"}}>
                <center><b><h2 className={"p-3 my-3 text-dark"} color={"red"}>Statistics</h2></b></center>
                <br/>
                <center>
                    <ul>
                        <li> <h4> All Books : {this.state.all_books}</h4> </li>
                        <li> <h4> All Categories : {this.state.all_categories}</h4> </li>
                        <li> <h4> All Reserved Books : {this.state.all_reserved_books}</h4> </li>
                        <li> <h4> All Issued Books : {this.state.all_issued_books}</h4> </li>
                    </ul>
                </center>
                <br/>
                <table id="example" className="table bg-white table-striped table-bordered border-0 table-hover">
                    <thead style={{"background": "#400000"}} className={"text-light"}>
                    <tr>
                        <th>Book Category</th>
                        <th>Count</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.bookList()}
                    </tbody>
                </table>
                <br />
            </div>
        );
    }
}
