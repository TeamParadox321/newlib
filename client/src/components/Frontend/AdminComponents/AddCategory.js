import React,{Component} from 'react';
import axios from 'axios';

export default class AddCategory extends Component{
    constructor(props) {
        super(props);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            category:''
        }
    }
    onChangeCategory(e){
        this.setState({
            category : e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const newCat = {
            token : localStorage.usertoken,
            category: this.state.category
        };
        axios.post('/users/add_category', newCat)
            .then(res=>{
                alert(res.data);
            }).catch(err=>{
                alert(err);
            });
        this.setState({
            category : ''
        });
    }

    render() {
        return (
            <div className="login-form">
                <div className={"frm"}>
                    <button type="button" className="close " data-dismiss="modal" style={{"padding-right": "10px", "color": "white"}}><span aria-hidden="true">&times;</span></button>
                    <center><h2 className="text-light"> Add Category </h2></center>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <p className={"txt"}>New Category :</p>
                        <input type="text" className="form-control" placeholder="New Category" required="required"
                               value={this.state.category} onChange={this.onChangeCategory}/>
                    </div><br/>
                    <div className="form-group">
                        <button type={"submit"} className={"btn btn-primary btn-block"} style={{"background": "#400000"}}>Add Category</button>
                    </div>
                </form>
            </div>
        );
    }
}