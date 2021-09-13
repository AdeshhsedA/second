import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

function Nav(){


    const [cat , setCat] = useState('');


    function searchbycategory(){
        if(cat == ''){
            alert('fill category');
        }else{
            localStorage.setItem('setcategory',cat);
            window.location.href='/categorywiseview';
        }
    }


    


    return (
        <div>
            <nav className="navbar navbar-default navbar-fixed-top ">
                <div className="container-fluid ">
                    <div className="navbar-header">
                        <div className="navbar-brand">
                            FlavourChef

                        </div>

                    </div>

                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><a href="/recipies">Recipies</a></li>
                        
                        <li><div className="srch"><input type = "text" onChange={(event)=>{setCat(event.target.value)}} className="srchbox"  placeholder="Search By Category" />
                                <button onClick={searchbycategory} className="srchbtn">Search</button>
                        </div></li>
                       

                    </ul>


                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="/register">Register</a></li>
                        <li><a href="/userlogin">Log In</a></li>
                        
                    </ul>

                </div>
            </nav>
            <div class="margin">

            </div>
        </div>
    )
}

export default Nav;