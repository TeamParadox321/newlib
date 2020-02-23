import React, {Component} from 'react';
import axios from 'axios';
import IM from "./user.png"
import ChangePassword from "./ChangePassword";

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id : '',
            user_name: '',
            user_email: '',
            user_phone_number: '',
            user_role: '',
            _id: '',
            fine:''
        };
    }
    componentDidMount(){
        var usertoken = localStorage.usertoken;
        if(usertoken!=null){
            axios.post('/users/profile', {token: usertoken})
                .then(response=>{
                    this.setState({
                        user_id: response.data.user_id,
                        user_name: response.data.user_name,
                        user_email: response.data.user_email,
                        user_phone_number: response.data.user_phone_number,
                        user_role: response.data.user_role,
                        _id: response.data._id
                    })
                })
                .catch(function (error) {
                    console.log(error)
                });
            if(localStorage.userrole==='student'){
                axios.post('/users/fine', {token: usertoken})
                    .then(response=>{
                        this.state.fine = response.data
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        }
    }


    render(){

        return (
            <div className="container">
                <br/><br/><br/>
                <div className="container-fluid">
                    <center><h1>User Profile</h1></center>
                    <br/><br/>
                    <div className="row">
                        <div className="col-lg">
                            <center>
                                <img alt={"User Img"} width={"300px"} height={"300px"} src={IM}/>
                                <br/><br/>
                                <h2>{this.state.user_role.toUpperCase()}</h2>
                            </center><br/><br/>
                        </div>
                        <div className="col-lg">
                            <b>
                                <div className="row">
                                    <div className={"col"}> User ID </div>
                                    <div className={"col"}> {this.state.user_id} </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className={"col"}> Name </div>
                                    <div className={"col"}> {this.state.user_name} </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className={"col"}> Email </div>
                                    <div className={"col"}> {this.state.user_email} </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className={"col"}> Phone Number </div>
                                    <div className={"col"}> {this.state.user_phone_number} </div>
                                </div> <br/>
                                {localStorage.userrole==='student'?
                                    <div className="row">
                                        <div className={"col"}> Fines to pay </div>
                                        <div className={"col"}> {this.state.fine.toString()} </div>
                                    </div> : ''
                                }
                                <br/><br/>
                            </b>
                            <button data-toggle="modal" data-target="#changePassword" className={"btn btn-primary btn-block"} style={{"background": "#400000", "max-width": "300px"}}>
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="container">
                    <div className="modal close" id="changePassword" data-dismiss="modal">
                        <div>
                            <ChangePassword/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
