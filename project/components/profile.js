import React from 'react';
import './profile.css'


function Profile(){

    var ptoken = localStorage.getItem('token');
    if(ptoken == null){
        window.location.href="/userlogin";
    }


    

    function logout(){
        localStorage.removeItem('token');
        window.location.href="/userlogin";
    }



    return(
        <div>
            <nav className="navbar navbar-default navbar-fixed-top pnav">
                <div className="container-fluid navcontainer">
                    <div className="navbar-header col-lg-12 text-center">
                        <div className="username col-lg-12">
                            <p>{ptoken}</p>
                        </div>
                        

                    </div>
                    
                    <div className="navbar-body col-lg-12 listitem">
                        <ul className="nav navbar-nav navlist">
                            <li className="col-lg-12"><a href="/dashboard" className="homebtn">Home</a></li>
                            <li  className="col-lg-12"><a href='/userdetails'>My Account</a></li>
                            <li className="col-lg-12 "><a href='/userfavs'>Favourites</a></li>
                            <li className="col-lg-12 "><a href="/mycomments">My Comments</a></li>
                            <li className="col-lg-12"><button onClick={logout} className="btn btn-danger logoutbtn">Logout</button> </li>
                        </ul>
                    </div>

                </div>
            </nav>

        </div>
    )
}

export default Profile;
