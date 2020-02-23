import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Book = props => (
    <tr>
        <td> <Link to={'/book/'+props.book._id}>{props.book.book_id}</Link>  </td>
        <td> {formatDate(props.book.reserved_date)} </td>
        <td> <button onClick={()=>{
            cancel(props.book.book_id, props.book.ref_id)
        }} type="button" className="btn btn-outline-danger">Cancel</button> </td>
    </tr>
);
function cancel(book_id, ref_id){
    axios.post('/users/cancel', {
        token:localStorage.usertoken,
        book_id: book_id,
        ref_id: ref_id
    })
        .then(response=>{
            alert(response.data)
        })
        .catch(function (error) {
            alert(error)
        });
}
function formatDate(dt) {
    var date = new Date(dt);
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hour + ':'  + min + ':' + sec;
}
export default class ReservedBooks extends Component{
    constructor(props){
        super(props);
        this.state = {books: []};
    }
    componentDidMount(){
        axios.post('/users/reserved_books', {token:localStorage.usertoken})
            .then(response=>{
                this.setState({books: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    componentDidUpdate(){
        axios.post('/users/reserved_books',{token:localStorage.usertoken})
            .then(response=>{
                this.setState({books: response.data})
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
            <div className="container" style={{"padding-top":"100px"}}>
                <center><b><h2 className={"p-3 my-3 text-dark"} color={"red"}>Recently Reserved Books</h2></b></center>
                <br/>
                <table id="example" className="table bg-white table-striped table-bordered border-0 table-hover">
                    <thead style={{"background": "#400000"}} className={"text-light"}>
                    <tr>
                        <th>Book ID</th>
                        <th>Reserved Date</th>
                        <th></th>
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
