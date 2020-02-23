import React from 'react';
import {Link} from "react-router-dom";
import AllBooks from "./AllBooks";
function Books() {
    return (
        <div>
            <div style={{"padding-top": "30px", "padding-bottom": "30px"}}/>
            {localStorage.userrole==='student' ? <div>
                <Link to={"/all_books"}>
                    <div className="container bg-primary p-3 my-3 text-white">
                        <h2 className={"text-light"}>All Books</h2>
                        <p>All the books the library has, will be appeared.</p>
                    </div>
                </Link>
                <Link to={"/reserved_books"}>
                    <div className="container p-3 my-3 bg-primary text-white">
                        <h2 className={"text-light"}>Reserved Books</h2>
                        <p> The books you have reserved recently will be appeared. </p>
                    </div>
                </Link>
                <Link to={"/borrowed_books"}>
                    <div className="container p-3 my-3 bg-primary text-white">
                        <h2 className={"text-light"}>Recently Borrowed Books</h2>
                        <p>The books you have borrowed recently will be appeared.</p>
                    </div>
                </Link>
                <Link to={"/history"}>
                    <div className="container p-3 my-3 bg-primary text-white">
                        <h2 className={"text-light"}>History</h2>
                        <p> History of borrowing and returning books by you.</p>
                    </div>
                </Link>
                <br/>
            </div>: localStorage.userrole==='librarian' ?
                <wrapper>
                    <Link to={"/inventory_books"}>
                        <div className="container bg-primary p-3 my-3 text-white">
                            <h2 className={"text-light"}>All Books</h2>
                        </div>
                    </Link>
                    <Link to={"/all_reserved_books"}>
                        <div className="container p-3 my-3 bg-primary text-white">
                            <h2 className={"text-light"}>Reserved Books</h2>
                        </div>
                    </Link>
                    <Link to={"/all_issued_books"}>
                        <div className="container p-3 my-3 bg-primary text-white">
                            <h2 className={"text-light"}>Issued Books</h2>
                        </div>
                    </Link>
                    <Link to={"/histories"}>
                        <div className="container p-3 my-3 bg-primary text-white">
                            <h2 className={"text-light"}>Histories</h2>
                        </div>
                    </Link>
                    <Link to={"/all_fines"}>
                        <div className="container p-3 my-3 bg-primary text-white">
                            <h2 className={"text-light"}>Fines</h2>
                        </div>
                    </Link>
                </wrapper>
                : <AllBooks/> };
        </div>
    );
}

export default Books;
