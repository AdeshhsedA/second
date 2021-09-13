import React, { useEffect, useState } from 'react';
import Axios from 'axios';




function LoginNav(){
    var token = localStorage.getItem('token');
    if(token == null){
        window.location.href="/userlogin";
    }

    function logout(){
        localStorage.removeItem('token');
        window.location.href="/userlogin";
    }

    const [category, setCategory] = useState([]);
    const [catdata, setCatdata] = useState('');


    function getcategory(){
        Axios.get('http://localhost:30/getcategory').then(function(succ){
            setCategory(succ.data);
        })
    }

    useEffect(()=>{
        getcategory();
    },[])


    function gotoProfile(){
        window.location.href="/Userdetails";
    }

    function searchbycategory(cat){
        if(cat == ''){
            alert('fill category');
        }else{
            localStorage.setItem('setcategory',cat);
            window.location.href='/logcatview';
        }
    }





    return(
        <div>
            <div>
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="navbar-brand">
                            FlavourChef

                        </div>

                    </div>

                    <ul className="nav navbar-nav">
                        <li><a href="/dashboard">Home</a></li>
                        <li><a href="/loginrecipies">Recipies</a></li>

                    </ul>

                    <select onChange={(event)=>{searchbycategory(event.target.value)}} className = "catselect">
                                <option  >Category</option>
                                {category.map((cat)=>(
                                    <option key = {cat._id} value={cat.Name}   className="opt">
                                        {cat.Name}
                                    </option>
                                ))}

                    </select>


                    <ul className="nav navbar-nav navbar-right">
                    <button onClick={logout} className="btn btn-danger logoutbtn">Logout</button> 
                        
                        
                        
                        <li>
                            <div className="userbox dropdown">
                                <button onClick={gotoProfile} className=" glyphicon glyphicon-user userbtn" ></button>
                                 
                            </div>
                            
                        </li>
                        <li><a>{token} </a></li>
                    </ul>
                </div>
            </nav> 


            <div class="margin">

            </div>



            </div> 
        </div>
    )
}



export default LoginNav;