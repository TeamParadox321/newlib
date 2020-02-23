import React, {Component} from 'react';
import axios from 'axios';

const Category = props => (
    <option value={''+props.category}> {props.category} </option>
);

export default class AddBooks extends Component{

    constructor(props){
        super(props);

        this.onChangeBookId = this.onChangeBookId.bind(this);
        this.onChangeBookTitle = this.onChangeBookTitle.bind(this);
        this.onChangeBookCategory = this.onChangeBookCategory.bind(this);
        this.onChangeBookAuthor = this.onChangeBookAuthor.bind(this);
        this.onChangeBookEdition = this.onChangeBookEdition.bind(this);
        this.onChangeBookIsbn = this.onChangeBookIsbn.bind(this);
        this.onChangeBookYear = this.onChangeBookYear.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            book_id : '',
            book_title : '',
            book_category : '',
            book_author : '',
            book_isbn: '',
            book_edition: '',
            book_year: '',
            categories : []
        }
    }

    onChangeBookId(e){
        this.setState({
            book_id : e.target.value
        })
    }
    onChangeBookTitle(e){
        this.setState({
            book_title : e.target.value
        })
    }
    onChangeBookCategory(e){
        this.setState({
            book_category : e.target.value
        })
    }
    onChangeBookAuthor(e){
        this.setState({
            book_author : e.target.value
        })
    }
    onChangeBookEdition(e){
        this.setState({
            book_edition : e.target.value
        })
    }
    onChangeBookIsbn(e){
        this.setState({
            book_isbn : e.target.value
        })
    }
    onChangeBookYear(e){
        this.setState({
            book_year : e.target.value
        })
    }
    componentDidMount() {
        axios.get('/books/categories')
            .then(response=>{
                this.state.categories = response.data;
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    onSubmit(e){
        e.preventDefault();

        const newBook = {
            book_id: this.state.book_id,
            book_title: this.state.book_title,
            book_category: this.state.book_category,
            book_author: this.state.book_author,
            book_isbn: this.state.book_isbn,
            book_edition: this.state.book_edition,
            book_year: this.state.book_year
        };
        axios.post('/books/addbooks', newBook)
            .then(res=>{
                alert(res.data)
            })
            .catch(err=>{
                alert(err);
            });
        this.setState({
            book_id : '',
            book_title : '',
            book_category : '',
            book_author : '',
            book_isbn: '',
            book_edition: '',
            book_year: ''
        });
    }
    categoryList(){
        return this.state.categories.map(function (currentCategory, i) {
            return <Category category={currentCategory} key={i}/>
        })
    }

    render() {
        return(
            <div className="login-form">
                <div className={"frm"}>
                    <button type="button" className="close " data-dismiss="modal" style={{"padding-right": "10px", "color": "white"}}><span aria-hidden="true">&times;</span></button>
                    <center><h2 className="text-light"> Add Book </h2></center>
                </div>
                <form className={"row"} onSubmit={this.onSubmit}>
                    <div className={"col-md"}>
                        <div className="form-group">
                            <p className={"txt"}>Book Id :</p>
                            <input type="text" className="form-control" placeholder="Book ID" required="required"
                                    value={this.state.book_id} onChange={this.onChangeBookId}/>
                        </div>
                        <div className="form-group">
                            <p className={"txt"}>Book ISBN :</p>
                            <input type="text" className="form-control" placeholder="Book ISBN" required="required"
                                   value={this.state.book_isbn} onChange={this.onChangeBookIsbn}/>
                        </div>
                        <div className="form-group">
                            <p className={"txt"}>Book Title :</p>
                            <input type="text" className="form-control" placeholder="Book Title" required="required"
                                   value={this.state.book_title} onChange={this.onChangeBookTitle}/>
                        </div>
                        <div className="form-group">
                            <p className={"txt"}>Book Edition :</p>
                            <input type="text" className="form-control" placeholder="Book Edition"
                                   value={this.state.book_edition} onChange={this.onChangeBookEdition}/>
                        </div>
                    </div>
                    <div className={"col-md"}>
                        <div className="form-group">
                            <p className={"txt"}>Category :</p>
                            <select className="custom-select form-control" onChange={this.onChangeBookCategory}>
                                <option value={''}> Category </option>
                                {this.categoryList()}
                            </select>
                        </div>
                        <div className="form-group">
                            <p className={"txt"}>Author :</p>
                            <input type="text" className="form-control" placeholder="Author"
                                   value={this.state.book_author} onChange={this.onChangeBookAuthor}/>
                        </div>
                        <div className="form-group">
                            <p className={"txt"}>Published Year :</p>
                            <input type="text" className="form-control" placeholder="Published Year"
                                   value={this.state.book_year} onChange={this.onChangeBookYear}/>
                        </div>
                        <div className="form-group">
                            <p className={"txt"}> &nbsp; </p>
                            <button type="submit" className={"btn btn-primary btn-block"} style={{"background": "#400000"}}>Add Book</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

