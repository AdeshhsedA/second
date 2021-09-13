import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Profile from './profile';
import './profile.css'


function Userdetails(){

    var ptoken = localStorage.getItem('token');
    if(ptoken == null){
        window.location.href="/userlogin";
    }


    var pemail = localStorage.getItem('useremail');
    const [pdata, setPdata] = useState([]);


    function finduser(){
        Axios.post('http://localhost:30/userdetail',{
            Email:pemail
        }).then(function(succ){
            setPdata(succ.data);
        })
    }


    useEffect(()=>{
        finduser();
    },[])




    return(
        <div>
            <Profile/>

            <div className="col-lg-offset-2">
                
                <div id="myprofile" className=" col-lg-12 text-center">

                    <h2>My Profile</h2>
                    <hr/>
                    <div className="userdatabox col-lg-offset-6 col-lg-offset-3">
                        <p>Name:{pdata.Name}</p>
                        <p>Email: {pdata.Email}</p>
                        <p>Contact:{pdata.Contact}</p>

                        <button className="btn btn-primary col-lg-4">Update Profile</button>
                        <button className="btn btn-danger col-lg-4 col-lg-offset-1">Delete Account</button>
                    </div>
                    

                </div>


            </div>

        </div>
    )
}

export default Userdetails;