import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Book = props => (
    <tr>
        <td> <Link to={'/book/'+props.book.ref_id}>{props.book.book_id}</Link>  </td>
        <td> {props.book.user_id}</td>
        <td> {formatDate(props.book.borrowed_date)} </td>
        <td> {formatDate(props.book.expected_return_date)} </td>
        <td> {formatDate(props.book.returned_date)} </td>
        <td> {props.book.fines.toString()}</td>
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
    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' '
        + (hour>11 ? ((hour-12) + ':' + min + ':' + sec + ' PM') :
            (hour + ':'  + min + ':' + sec + ' AM'));
}
export default class Histories extends Component{
    constructor(props){
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.state = {
            books: [],
            search : ''
        };
    }
    onChangeSearch(e){
        this.setState({
            search : e.target.value
        })
    }
    componentDidMount(){
        axios.post('/users/histories', {token:localStorage.usertoken})
            .then(response=>{
                this.setState({books: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    componentDidUpdate(){
        axios.post('/users/histories',{token:localStorage.usertoken})
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
            <div className="container" style={{"padding-top":"100px"}}>
                <center><b><h2 className={"p-3 my-3 text-dark"} color={"red"}>History</h2></b></center>
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
                        <th>Borrowed Date</th>
                        <th>Expected Returning Date</th>
                        <th>Returned Date</th>
                        <th>Fines</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.bookList(this.state.search)}
                    </tbody>
                </table>
                <br />
                <br />
                <br />
            </div>
        );
    }
}
