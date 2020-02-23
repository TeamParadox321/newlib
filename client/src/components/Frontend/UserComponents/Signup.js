import React,{Component} from 'react';
import axios from 'axios';

export default class Signup extends Component{
    constructor(props) {
        super(props);

        this.onChangeUsrId = this.onChangeUsrId.bind(this);
        this.onChangeTelephone = this.onChangeTelephone.bind(this);
        this.onChangeUsrEmail = this.onChangeUsrEmail.bind(this);
        this.onChangeUsrName = this.onChangeUsrName.bind(this);
        this.onChangeUsrPassword = this.onChangeUsrPassword.bind(this);
        this.onConfirmUsrPassword = this.onConfirmUsrPassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            user_id:"",
            user_email:"",
            user_name:"",
            user_password:"",
            user_confirm_password:"",
            user_phone_number: ''
        }
    }
    onChangeUsrId(e){
        this.setState({
            user_id : e.target.value
        })
    }
    onChangeUsrName(e){
        this.setState({
            user_name : e.target.value
        })
    }
    onChangeTelephone(e){
        this.setState({
            user_phone_number : e.target.value
        })
    }
    onChangeUsrEmail(e){
        this.setState({
            user_email : e.target.value
        })
    }
    onChangeUsrPassword(e){
        this.setState({
            user_password : e.target.value
        })
    }
    onConfirmUsrPassword(e){
        this.setState({
            user_confirm_password:e.target.value
        })
    }
    onSubmit(e) {
        if(this.state.user_password===this.state.user_confirm_password){
            e.preventDefault();

            const newUser = {
                user_id: this.state.user_id,
                user_name: this.state.user_name,
                user_email: this.state.user_email,
                user_password: this.state.user_password,
                user_phone_number: this.state.user_phone_number
            };
            axios.post('/users/user_signup', newUser)
                .then(res=>{
                    alert(res.data)
                }).catch(err=>{
                    alert(err)
                });
            this.setState({
                user_id: '',
                user_name: '',
                user_email: '',
                user_password: '',
                user_confirm_password:'',
                user_phone_number: ''
            });
        }else{
            alert("Password does not match");
            e.preventDefault();
        }
    }
    render() {
        return (
            <div className="login-form" style={{"max-width": "600px"}}>
                <div className={"frm"}>
                    <button type="button" className="close " data-dismiss="modal" style={{"padding-right": "10px", "color": "white"}}><span aria-hidden="true">&times;</span></button>
                    <center><h2 className="text-light"> Sign up</h2></center>
                </div>
                <form onSubmit={this.onSubmit}>
                    <dev className={"row"}>
                        <dev className={"col-lg"}>
                            <div className="form-group">
                                <p className={"txt"}>Student Id :</p>
                                <input type="text" className="form-control" placeholder="Student ID" required="required"
                                       value={this.state.user_id} onChange={this.onChangeUsrId}
                                />
                            </div>
                            <div className="form-group">
                                <p className={"txt"}>Email :</p>
                                <input type="email" className="form-control" placeholder="Email" required="required"
                                       value={this.state.user_email} onChange={this.onChangeUsrEmail}
                                />
                            </div>
                            <div className="form-group">
                                <p className={"txt"}>Name With Initials :</p>
                                <input type="text" className="form-control" placeholder="Name With Initials"
                                       required="required"
                                       value={this.state.user_name} onChange={this.onChangeUsrName}/>
                            </div>
                        </dev>
                        <dev className={"col-lg"}>
                            <div className="form-group">
                                <p className={"txt"}>Password :</p>
                                <input type="password" className="form-control" placeholder="Password" required="required"
                                       value={this.state.user_password} onChange={this.onChangeUsrPassword}
                                />
                            </div>
                            <div className="form-group">
                                <p className={"txt"}>Confirm Password :</p>
                                <input type="password" className="form-control" placeholder="Confirm Password"
                                       required="required"
                                       value={this.state.user_confirm_password} onChange={this.onConfirmUsrPassword}
                                />
                            </div>
                            <div className="form-group">
                                <p className={"txt"}>Phone Number :</p>
                                <input type="text" className="form-control" placeholder="Phone Number"
                                       required="required"
                                       value={this.state.user_phone_number} onChange={this.onChangeTelephone}/>
                            </div>

                        </dev>
                    </dev>
                    <div className="form-group">
                        <p className={"txt"}> &nbsp; </p>
                        <button type={"submit"} className={"btn btn-primary btn-block"} style={{"background": "#400000"}}>Sign up</button>
                    </div>
                </form>
            </div>
        );
    }
}

