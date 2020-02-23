import React, {Component} from 'react';
import axios from 'axios';

const Fine = props => (
    <tr>
        <td> {props.fine.user_id}</td>
        <td> {props.fine.user_fines} </td>
    </tr>
);
export default class Fines extends Component{
    constructor(props){
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.state = {
            fines: [],
            search : ''
        };
    }
    onChangeSearch(e){
        this.setState({
            search : e.target.value
        })
    }
    componentDidMount(){
        axios.post('/users/fines', {token:localStorage.usertoken})
            .then(response=>{
                this.setState({fines: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    componentDidUpdate(){
        axios.post('/users/fines', {token:localStorage.usertoken})
            .then(response=>{
                this.setState({fines: response.data})
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    fineList(prop){
        return this.state.fines.map(function (currentFine, i) {
            if(prop!==''){
                if(currentFine.user_id.toLowerCase().includes(prop.toLowerCase())){
                    return <Fine fine={currentFine} key={i} />
                }else{
                    return ''
                }
            }else{
                return <Fine fine={currentFine} key={i} />
            }
        })
    }
    render(){
        return (
            <div className="container" style={{"padding-top":"10px"}}>
                <center><b><h2 className={"p-3 my-3 text-dark"} color={"red"}>Fines</h2></b></center>

                    <input className="form-control" id="myInput" type="text" placeholder="Search.."
                           value={this.state.search} onChange={this.onChangeSearch}/>

                <br/>
                <table id="example" className="table bg-white table-striped table-bordered border-0 table-hover">
                    <thead style={{"background": "#400000"}} className={"text-light"}>
                    <tr>
                        <th>User ID</th>
                        <th>Fine</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.fineList(this.state.search)}
                    </tbody>
                </table>
                <br />
                <br />
            </div>
        );
    }
}
