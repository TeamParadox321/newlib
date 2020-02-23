import React, {Component} from 'react';
import axios from 'axios';

const User = props => (
    <tr>
        <td> {props.user.user_id} </td>
        <td> {props.user.user_name} </td>
        <td> {props.user.user_email} </td>
        <td> {props.user.user_phone_number} </td>
        <td> <button onClick={()=>{
                approve(props.user._id);
                }} type="button" className="btn btn-outline-success">Approve</button> &nbsp;
            <button onClick={()=>{
                remove(props.user._id);
            }} type="button" className="btn btn-outline-danger">Remove</button>

        </td>
    </tr>
);
function approve(prop) {
    axios.post('/users/approve', {
        token:localStorage.usertoken,
        id : prop
    })
        .then(response=>{
            alert(response.data)
        })
        .catch(function (error) {
            alert(error)
        });
}
function remove(prop) {
    axios.post('/users/remove_new_students', {
        token:localStorage.usertoken,
        id : prop
    })
        .then(response=>{
            alert(response.data)
        })
        .catch(function (error) {
            alert(error)
        });
}
export default class NewStudents extends Component{
    constructor(props){
        super(props);
        this.state = {users: []};
    }
    componentDidMount(){
        axios.get('/users/new_students')
            .then(response=>{
                this.setState({users: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    componentDidUpdate(){
        axios.get('/users/new_students')
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
                <center><b><h2 className={"p-3 my-3 text-dark"} color={"red"}>New Students</h2></b></center>
                <form style={{"display":"flex"}}>
                    <input className="form-control" id="myInput" type="text" placeholder="Search.." value={this.state.search} onChange={this.onChangeSearch}/>
                </form> <br/>
                <table id="example" class="table bg-white table-striped table-bordered border-0 table-hover">
                    <thead style={{"background":"#400000"}} className={"text-light"}>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.studentList()}
                    </tbody>
                </table>
                <br />
                <br />
            </div>
        )
    }
}
