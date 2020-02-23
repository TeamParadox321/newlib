import React from 'react';
import {Link} from "react-router-dom";
import IM from "./i1.jpg";
import IM2 from "./uoklogo.png"

function Home() {
    return (
        <div id="demo" className="carousel slide" data-ride="carousel">
            <ul className="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" className="active"> </li>
            </ul>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={IM} alt="Library Image" width="1600" height="710" style={{"filter": "brightness(70%)"}}/>
                        <div className="carousel-caption" style={{"padding-top": "300px"}}>
                            <img alt={"Logo of UOK"} src={IM2}/> <br/><br/>
                            <h1 style={{"color":"white"}}>Welcome To FCT Library Management System</h1> <br/>
                            <Link to={"/about"}><button type="button" className="btn btn-primary"><h5 id={"h-btn"}>About Us</h5></button></Link>
                            <br/><br/><br/><br/>
                        </div>
                </div>
            </div>
            <a className="carousel-control-prev" data-slide="prev" href={'#'}>
                <span className="carousel-control-prev-icon"> </span>
            </a>
            <a className="carousel-control-next" data-slide="next" href={"#"}>
                <span className="carousel-control-next-icon"> </span>
            </a>
        </div>
    );
}

export default Home;


