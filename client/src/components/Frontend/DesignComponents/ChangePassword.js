import React,{Component} from 'react';
import axios from 'axios';

export default class ChangePassword extends Component{
    constructor(props) {
        super(props);

        this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            old_password:"",
            new_password:"",
            confirm_password : ""
        }
    }
    onChangeOldPassword(e){
        this.setState({
            old_password : e.target.value
        })
    }
    onChangeNewPassword(e){
        this.setState({
            new_password : e.target.value
        })
    }
    onChangeConfirmPassword(e){
        this.setState({
            confirm_password : e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            token : localStorage.usertoken,
            user_password: this.state.old_password,
            new_user_password: this.state.new_password
        };
        if(this.state.new_password===this.state.confirm_password){
            axios.post('/users/change_password', newUser)
                .then(res=>{
                    alert(res.data);
                    this.setState({
                        old_password: '',
                        new_password: '',
                        confirm_password: ''
                    });
                }).catch(err=>{
                    alert(err)
                });
        }else{
            alert('New passwords are not match');
        }
    }

    render() {
        return (
            <div className="login-form">
                <div className={"frm"}>
                    <button type="button" className="close " data-dismiss="modal" style={{"padding-right": "10px", "color": "white"}}><span aria-hidden="true">&times;</span></button>
                    <center><h2 className="text-light"> Change Password </h2></center>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <p className={"txt"}>Old Password :</p>
                        <input type="password" className="form-control" placeholder="Old Password" required="required"
                               value={this.state.old_password} onChange={this.onChangeOldPassword}/>
                    </div>
                    <div className="form-group">
                        <p className={"txt"}>New Password :</p>
                        <input type="password" className={"form-control"} placeholder={"New Password"} required={"required"}
                               value={this.state.new_password} onChange={this.onChangeNewPassword}/>
                    </div>
                    <div className="form-group">
                        <p className={"txt"}>Confirm New Password :</p>
                        <input type="password" className={"form-control"} placeholder={"Confirm New Password"} required={"required"}
                               value={this.state.confirm_password} onChange={this.onChangeConfirmPassword}/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <button type={"submit"} className={"btn btn-primary btn-block"} style={{"background": "#400000"}}>Change Password</button>
                    </div>
                </form>
            </div>
        );
    }
}