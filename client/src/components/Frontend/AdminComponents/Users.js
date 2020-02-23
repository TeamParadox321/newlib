import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import AddStudent from "./AddStudent";

const User = props => (
    <tr>
        <td> <Link to={'/users/'+props.user._id}> {props.user.user_id}</Link> </td>
        <td> {props.user.user_name} </td>
        <td> {props.user.user_email} </td>
        <td> {props.user.user_phone_number} </td>
    </tr>
);
export default class Users extends Component{
    constructor(props){
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeUserRole = this.onChangeUserRole.bind(this);
        this.state = {
            users: [],
            search : '',
            user_role : 'all'
        };
    }
    onChangeSearch(e){
        this.setState({
            search : e.target.value
        })
    }
    onChangeUserRole(e){
        this.setState({
            user_role : e.target.value
        });
    }
    componentDidMount(){
        axios.get('/users/')
            .then(response=>{
                this.setState({users: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    componentDidUpdate(){
        axios.get('/users/')
            .then(response=>{
                this.setState({users: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    studentList(props, cat){
        return this.state.users.map(function (currentUser, i) {
            if(props.trim()!==''){
                if(currentUser.user_id.toLowerCase().includes(props.toLowerCase())||currentUser.user_name.toLowerCase().includes(props.toLowerCase())
                ||currentUser.user_email.toLowerCase().includes(props.toLowerCase())||currentUser.user_phone_number.toLowerCase().includes(props.toLowerCase())){
                    if(cat==='all'){
                        return <User user={currentUser} key={i} />
                    }else{
                        if(currentUser.user_role===cat){
                            return <User user={currentUser} key={i} />
                        }
                    }
                }
            }else{
                if(cat==='all'){
                    return <User user={currentUser} key={i} />
                }else{
                    if(currentUser.user_role===cat){
                        return <User user={currentUser} key={i} />
                    }
                }
            }

        })
    }
    render(){
        return (
            <div className="container" style={{"padding-top":"10px"}}>
                <center><b><h2 className={"p-3 my-3 text-dark"} color={"red"}>Users</h2></b></center>
                <p> All Users Count : {this.state.users.length}</p>
                <form style={{"display":"flex"}}>
                    <button style={{"max-height":"40px","min-width": "150px"}} type="button" className="btn btn-outline-success" data-toggle="modal" data-target="#addStudent">Add Student</button>
                    <select name="users" className="custom-select form-control" onChange={this.onChangeUserRole}>
                        <option value={"all"}>All</option>
                        <option value="student">Students</option>
                        <option value="librarian">Librarians</option>
                    </select>
                    <input className="form-control" id="myInput" type="text" placeholder="Search.." value={this.state.search} onChange={this.onChangeSearch}/>
                </form> <br/>
                <table id="example" class="table bg-white table-striped table-bordered border-0 table-hover">
                    <thead style={{"background":"#400000"}} className={"text-light"}>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.studentList(this.state.search,this.state.user_role)}
                    </tbody>
                </table>
                <br />
                <br />
                <div className="container">
                    <div className="modal close" id="addStudent" data-dismiss="modal">
                        <div>
                            <AddStudent/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
