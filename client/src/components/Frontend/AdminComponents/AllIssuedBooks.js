import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Book = props => (
    <tr>
        <td> <Link to={'/book/'+props.book.ref_id}>{props.book.book_id}</Link>  </td>
        <td> {props.book.user_id} </td>
        <td> {formatDate(props.book.issued_date)} </td>
        <td> {formatDate(props.book.expected_return_date)} </td>
        <td>
            <button onClick={()=>{
                returning(props.book.user_id, props.book.book_id, props.book.ref_id, props.book.issued_date, props.book.expected_return_date)
            }} type="button" className="btn btn-outline-success">Returned</button>
        </td>
    </tr>
);
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
function returning(user_id, book_id, ref_id, issued_date, expected_return_date){
    axios.post('/users/return', {
        token:localStorage.usertoken,
        book_id: book_id,
        user_id: user_id,
        issued_date: issued_date,
        expected_return_date: expected_return_date,
        ref_id: ref_id
    })
        .then(response=>{
            alert(response.data)
        })
        .catch(function (error) {
            alert(error)
        });
}

export default class AllIssuedBooks extends Component{
    constructor(props){
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.state = {
            books: [],
            search: ''
        };
    }
    componentDidMount(){
        axios.post('/users/all_issued_books', {token:localStorage.usertoken})
            .then(response=>{
                this.setState({books: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    onChangeSearch(e){
        this.setState({
            search : e.target.value
        })
    }
    componentDidUpdate(){
        axios.post('/users/all_issued_books',{token:localStorage.usertoken})
            .then(response=>{
                this.setState({books: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    bookList(prop){
        return this.state.books.map(function (currentBook, i) {
            if(prop!==''){
                if(currentBook.book_id.toLowerCase().includes(prop.toLowerCase())||currentBook.user_id.toLowerCase().includes(prop.toLowerCase())){
                    return <Book book={currentBook} key={i} />
                }else{
                    return ''
                }
            }else{
                return <Book book={currentBook} key={i} />
            }
        })
    }
    render(){
        return (
            <div className="container" style={{"padding-top":"10px"}}>
                <center><b><h2 className={"p-3 my-3 text-dark"} color={"red"}>All Issued Books</h2></b></center>
                <form style={{"display": "flex"}}>
                    <input className="form-control" id="myInput" type="text" placeholder="Search.."
                           value={this.state.search} onChange={this.onChangeSearch}/>
                </form>
                <br/>
                <table id="example" className="table bg-white table-striped table-bordered border-0 table-hover">
                    <thead style={{"background": "#400000"}} className={"text-light"}>
                    <tr>
                        <th>Book ID</th>
                        <th>Student ID</th>
                        <th>Issued Date</th>
                        <th>Expected Returning Date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.bookList(this.state.search)}
                    </tbody>
                </table>
                <br />
            </div>
        );
    }
}
