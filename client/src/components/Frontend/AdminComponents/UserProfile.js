import React, {Component} from 'react';
import axios from 'axios';
import IM from "../DesignComponents/user.png"

export default class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id : '',
            user_name: '',
            user_email: '',
            user_phone_number: '',
            user_role: '',
            _id: ''
        };
    }
    componentDidMount(){
        var usertoken = localStorage.usertoken;
        if(usertoken!=null){
            axios.get('/users/'+this.props.match.params.id)
                .then(response => {
                    this.setState({
                        user_id: response.data.user_id,
                        user_name: response.data.user_name,
                        user_email: response.data.user_email,
                        user_phone_number: response.data.user_phone_number,
                        user_role: response.data.user_role,
                        _id: response.data._id
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


    render(){
        return (
            <div className="container">
                <br/><br/><br/><br/><br/>
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
                                </div>
                                <br/>
                            </b>
                            {this.state.user_role === 'student' ?
                                <button className={"btn btn-primary btn-block"}
                                        style={{"height": "40px", "background": "#400000", "max-width": "400px"}}
                                        onClick={() => {
                                            axios.post('/users/delete_user', {
                                                token: localStorage.usertoken,
                                                user_id: this.state.user_id
                                            })
                                                .then(res => {
                                                    alert(res.data);
                                                }).catch(err => {
                                                alert(err);
                                            });
                                        }}>
                                    Delete
                                </button> : ''
                            }
                        </div>
                    </div>
                </div>
                <br/><br/><br/>
            </div>
        )
    }
}
