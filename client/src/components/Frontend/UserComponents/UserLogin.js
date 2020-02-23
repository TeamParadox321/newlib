import React,{Component} from 'react';
import axios from 'axios';

export default class UserLogin extends Component{
    constructor(props) {
        super(props);

        this.onChangeUsrId = this.onChangeUsrId.bind(this);
        this.onChangeUsrPassword = this.onChangeUsrPassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            user_id:"",
            user_password:""
        }
    }
    onChangeUsrId(e){
        this.setState({
            user_id : e.target.value
        })
    }
    onChangeUsrPassword(e){
        this.setState({
            user_password : e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            user_id: this.state.user_id,
            user_password: this.state.user_password
        };
        axios.post('/users/user_login', newUser)
            .then(res=>{
                if(res.data.token!=null){
                    localStorage.setItem('usertoken', res.data.token);
                    localStorage.setItem('userrole', res.data.role);
                    localStorage.setItem('userid', res.data.id);
                    this.props.fs();
                    alert('Welcome '+ res.data.role);
                }else{
                    alert(res.data);
                }

            }).catch(err=>{
                alert(err);
            });
        this.setState({
            user_id: '',
            user_password: ''
        });
    }

    render() {
        return (
            <div className="login-form">
                <div className={"frm"}>
                    <button type="button" className="close " data-dismiss="modal" style={{"padding-right": "10px", "color": "white"}}><span aria-hidden="true">&times;</span></button>
                    <center><h2 className="text-light"> Sign In</h2></center>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <p className={"txt"}>User Id :</p>
                        <input type="text" className="form-control" placeholder="User ID" required="required"
                               value={this.state.user_id} onChange={this.onChangeUsrId}/>
                    </div>
                    <div className="form-group">
                        <p className={"txt"}>Password :</p>
                        <input type="password" className={"form-control"} placeholder={"Password"} required={"required"}
                               value={this.state.user_password} onChange={this.onChangeUsrPassword}/>
                    </div><br/>
                    <div className="form-group">
                        <button type={"submit"} className={"btn btn-primary btn-block"} style={{"background": "#400000"}}>Sign In</button>
                    </div>
                </form>
            </div>
        );
    }
}