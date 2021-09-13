import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Profile from './profile';


function Mycomments(){

    var usermail = localStorage.getItem('useremail');


    const [comments, setComments] = useState([]);

    function findcomments(){
        Axios.post('http://localhost:30/findcomments',{
            UserName:usermail
        }).then(function(succ){
            setComments(succ.data);
        })
    }



    useEffect(()=>{
        findcomments();
    },[])


    function deletecomment(x){
        Axios.post('http://localhost:30/delcomment',{
            id:x
        }).then(function(succ){
            findcomments();
        })
    }


    return(
        <div >
            <Profile/>
            <div className="col-lg-8 col-lg-offset-3 container">
                {comments.map((comm)=>(
                    <div key={comm._id} className="col-lg-12 well commentbox">
                        <p>Recipe Name: {comm.Recipe}</p>
                        <p>My Comment: {comm.Comment}</p>
                        <button onClick={()=>{deletecomment(comm._id)}} className="btn btn-danger">Delete</button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Mycomments;