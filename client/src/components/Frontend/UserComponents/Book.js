import React, {Component} from 'react';
import axios from 'axios';
import IM from "../DesignComponents/book.png";
import UpdateBook from "../AdminComponents/UpdateBooks";

const Author = props => (
    <li className={"row"}>&nbsp;&nbsp;&nbsp;&nbsp;{props.author}<br/><br/></li>
);

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id : '',
            book_id : '',
            book_title : '',
            book_category : '',
            book_author : [],
            book_isbn: '',
            book_edition: '',
            book_year: '',
            book_availability: ''
        };
    }
    authorList(){
        return this.state.book_author.map(function (currentAuthor, i) {
            return <Author author={currentAuthor} key={i}/>
        })
    }
    componentDidMount(){
        axios.get('/books/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    book_id: response.data.book_id,
                    book_title: response.data.book_title,
                    book_category: response.data.book_category,
                    book_author: response.data.book_author.split(", "),
                    book_isbn: response.data.book_isbn,
                    book_edition: response.data.book_edition,
                    book_year: response.data.book_year,
                    book_availability: response.data.book_availability.toString()
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidUpdate(){
        axios.get('/books/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    book_id: response.data.book_id,
                    book_title: response.data.book_title,
                    book_category: response.data.book_category,
                    book_author: response.data.book_author.split(", "),
                    book_isbn: response.data.book_isbn,
                    book_edition: response.data.book_edition,
                    book_year: response.data.book_year,
                    book_availability: response.data.book_availability.toString()
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render(){
        return (
            <div className="container">
                <br/><br/>
                <div className="container-fluid">
                    <center><h1>Book Profile</h1></center>
                    <br/><br/>
                    <div className="row">
                        <div className="col-lg">
                            <center>
                                <img alt={"Book Img"} width={"300px"} height={"300px"} src={IM}/>
                                <br/><br/>
                                <h2>{this.state.book_id}</h2>
                            </center><br/><br/>
                        </div>
                        <div className="col-lg">
                            <b>
                                <div className="row">
                                    <div className={"col"}> ISBN </div>
                                    <div className={"col"}> {this.state.book_isbn} </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className={"col"}> Title </div>
                                    <div className={"col"}> {this.state.book_title} </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className={"col"}> Category </div>
                                    <div className={"col"}> {this.state.book_category} </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className={"col"}> Authors </div>
                                    <ul className={"col"}>
                                        {this.authorList()}
                                    </ul>
                                </div>
                                <div className="row">
                                    <div className={"col"}> Edition </div>
                                    <div className={"col"}> {this.state.book_edition} </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className={"col"}> Year </div>
                                    <div className={"col"}> {this.state.book_year} </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className={"col"}> Availability </div>
                                    <div className={"col"}> {this.state.book_availability?'YES':'NO'} </div>
                                </div>
                                <br/>
                                {(localStorage.userrole==='student'&&this.state.book_availability==='true') ?
                                    <center>
                                        <button className={"btn btn-primary btn-block"} style={{"background": "#400000", "max-width": "300px"}} onClick={()=>{
                                        axios.post('/users/reserve', {
                                            token: localStorage.usertoken, book_id: this.state.book_id, ref_id: this.state._id
                                        })
                                            .then(res=>{
                                                alert(res.data);
                                            })
                                            .catch(err=>{
                                                alert(err);
                                            })
                                        }}>Reserve</button>
                                    </center> : ''}
                                {(localStorage.userrole==='librarian') ?
                                    <center>
                                        <button data-toggle="modal" data-target="#update" className={"btn btn-primary btn-block"} style={{"background": "#400000", "max-width": "300px"}}>
                                            Edit
                                        </button>
                                    </center> : ''}
                            </b>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="container">
                    <div className="modal close" id="update" data-dismiss="modal">
                        <div>
                            <UpdateBook id={this.state._id}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
