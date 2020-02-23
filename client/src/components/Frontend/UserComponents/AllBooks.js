import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Category = props => (
    <option value={''+props.category}> {props.category} </option>
);
const Book = props => (
    <tr>
        <td> <Link to={'/book/'+props.book._id}>{props.book.book_id}</Link>  </td>
        <td> {props.book.book_title} </td>
        <td> {props.book.book_category} </td>
        <td> {props.book.book_author} </td>
        <td> {props.book.book_availability?'YES':'NO'} </td>
    </tr>
);
export default class AllBooks extends Component{
    constructor(props){
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.state = {
            books: [],
            search: '',
            categories : [],
            category : 'all'
        };
    }
    componentDidMount(){
        axios.get('/books/')
            .then(response=>{
                this.setState({books: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
        axios.get('/books/categories')
            .then(response=>{
                this.state.categories = response.data;
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
    onChangeCategory(e){
        this.setState({
            category : e.target.value
        });
    }
    componentDidUpdate(){
        axios.get('/books/')
            .then(response=>{
                this.setState({books: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
        axios.get('/books/categories')
            .then(response=>{
                this.state.categories = response.data;
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    bookList(props, cat){
        return this.state.books.map(function (currentBook, i) {
            if(props.trim()!==''){
                if(currentBook.book_id.toLowerCase().includes(props.toLowerCase())||currentBook.book_title.toLowerCase().includes(props.toLowerCase())){
                    if(cat==='all'){
                        return <Book book={currentBook} key={i}/>
                    }else{
                        if(currentBook.book_category===cat){
                            return <Book book={currentBook} key={i}/>
                        }
                    }
                }
            }else{
                if(cat==='all'){
                    return <Book book={currentBook} key={i}/>
                }else{
                    if(currentBook.book_category===cat){
                        return <Book book={currentBook} key={i}/>
                    }
                }
            }
            return ''
        })
    }
    categoryList(){
        return this.state.categories.map(function (currentCategory, i) {
            return <Category category={currentCategory} key={i}/>
        })
    }
    render(){
        return (
            <div className="container" style={{"padding-top":"0px"}}>
                <center><b><h2 className={"p-3 my-3 text-dark"} color={"red"}>All Books</h2></b></center>
                <p> All Books Count : {this.state.books.length}</p>
                <form style={{"display":"flex"}}>
                    <select className="custom-select form-control" onChange={this.onChangeCategory}>
                        <option selected value={'all'}>Category</option>
                        {this.categoryList()}
                    </select>
                    <input className="form-control" id="myInput" type="text" placeholder="Search.." value={this.state.search} onChange={this.onChangeSearch}/>
                </form> <br/>
                <table id="example" class="table bg-white table-striped table-bordered border-0 table-hover">
                    <thead style={{"background":"#400000"}} className={"text-light"}>
                    <tr>
                        <th>Book ID</th>
                        <th>Book Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Availability</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.bookList(this.state.search, this.state.category)}
                    </tbody>
                </table>
                <br />
            </div>
        );
    }
}
