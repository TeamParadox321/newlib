import React, {Component} from 'react';
import axios from 'axios';
import AddStudent from "./AddStudent";

const User = props => (
    <tr>
        <td> {props.user.user_id} </td>
        <td> {props.user.user_name} </td>
        <td> {props.user.user_email} </td>
        <td> {props.user.user_phone_number} </td>
    </tr>
);
export default class Users extends Component{
    constructor(props){
        super(props);
        this.state = {users: []};
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
    studentList(){
        return this.state.users.map(function (currentUser, i) {
            return <User user={currentUser} key={i} />
        })
    }
    render(){
        return (
            <div className="container" style={{"padding-top":"10px"}}>
                <center><b><h2 className={"p-3 my-3 text-dark"} color={"red"}>Users</h2></b></center>
                <form style={{"display":"flex"}}>
                    <button style={{"max-height":"40px","min-width": "150px"}} type="button" className="btn btn-outline-success" data-toggle="modal" data-target="#addStudent">Add Student</button>
                    <select name="users" className="custom-select form-control">
                        <option selected>All</option>
                        <option value="volvo">Students</option>
                        <option value="fiat">Librarians</option>
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
                    {this.studentList()}
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
