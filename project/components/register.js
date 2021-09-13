import React ,{useState} from 'react';
import './all.css';
import Nav from './nav';
import Axios from 'axios';

function Register(){

        const [name, setName] = useState('');
        const [email , setEmail] = useState('');

        const [contact , setContact] = useState('');
        const [password, setPassword] = useState('');


        function checkuser(){
            Axios.post('http://localhost:30/checkuser',{
                Email:email
            }).then(function(succ){
                alert(succ)
                if(succ == true){
                    insertdata();
                }else{
                    alert(email + '  already exist');
                }
            })
        }

        function checkuser(){
            if(name == '' || email == '' || password == ''){
                alert('Please fill the details');
            }else{
                Axios.post('http://localhost:30/checkuser',{
                Email:email
                }).then(function(succ){
                if(succ.data == true){
                    insertdata();
                }else{
                    alert(email + ' already exist');
                }
            })
    
            }
            
        }

        function insertdata(){
                Axios.post('http://localhost:30/insertuser',{
                Name:name,
                Email:email,
                Contact:contact,
                Password:password
            }).then(function(succ){
                if(succ.data == true){
                    alert('Registed Successfully');
                    localStorage.setItem('token',name);
                    window.location.href="/dashboard";

                }else{
                    alert('something went wrong');
                }
                
            })
            
        }



    return(
        <div>
            <Nav/>
            


            <div className = "container1 container well col-lg-4 col-lg-offset-4">
                <div className="from-group text-center">
                    <h3>Sign Up</h3>

                </div>

                <div >
                <input type = "text" onChange = {(event)=>{setName(event.target.value)}} className="form-control inptfeedback"  placeholder="Name"/>
                <i className="glyphicon glyphicon-user btnfeedback"></i>
                </div>

                <div >

                <input type = "email" onChange = {(event)=>{setEmail(event.target.value)}} className="form-control inptfeedback"  placeholder = "Email"/>
                <i className="glyphicon glyphicon-envelope btnfeedback"></i>
                </div>

                <div >
                <input type = "text" onChange = {(event)=>{setContact(event.target.value)}} className="form-control inptfeedback"  placeholder = "Contact" />
                <i className="glyphicon glyphicon-phone btnfeedback"></i>
                </div>

                <div >
                <input type = "password" onChange = {(event)=>{setPassword(event.target.value)}} className="form-control inptfeedback "  placeholder = "Password"/>
                <i className="glyphicon glyphicon-lock btnfeedback"></i>
                </div>


                <div >
                    <button onClick={checkuser} className="btn btn-primary col-lg-4"> Submit</button>

                </div>
               
               
               
                

                
            </div>

        </div>
    )
}

export default Register;