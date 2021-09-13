import React, {useState, useEffect} from 'react';
import './all.css';
import Nav from './nav';
import Axios from 'axios';

function Userlog(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, setUser] = useState([]);
    var userdata = [];

    function getuser(){
        Axios.get('http://localhost:30/getuser').then(function(succ){
            setUser(succ.data);
        })
    }

    function finduser(){
        for(var i = 0; i<user.length; i++){
            if(user[i].Email == email && user[i].Password == password){
                userdata = user[i];
            }

        }
        LogIn();
    }

    useEffect(()=>{
        getuser();
    }, [])

    function LogIn(){
        if(email == '' || password == ''){
            alert('Please enter the credentials');
        }
        else if(email == userdata.Email && password == userdata.Password){
            localStorage.setItem('token',userdata.Name);
            localStorage.setItem('useremail',userdata.Email);
            window.location.href="/dashboard";
        
        }else{
            alert("Access Denied");
        }
    }





    return(
        <div>
            <Nav/>
            <div className = "container1 container well col-lg-4 col-lg-offset-4">
                <div className="text-center">
                    <h3>Sign In</h3>

                </div>
                <div >
                    
                    <input type ="email" onChange = {(event)=>{setEmail(event.target.value)}} className="form-control inptfeedback" placeholder = "Email"/>
                    <i className="glyphicon glyphicon-envelope  btnfeedback"></i>
                </div>

                <div >
                    <input type = "password" onChange = {(event)=>{setPassword(event.target.value)}} className="form-control inptfeedback" placeholder = "Password"/>
                    <i className="glyphicon glyphicon-lock btnfeedback"></i>
                </div>

                <div >
                    <button onClick = {finduser} className="btn btn-primary col-lg-4">Log In</button>
                </div>
            </div>

        </div>
    )
}

export default Userlog;