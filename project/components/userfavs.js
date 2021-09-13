import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Profile from './profile';




function Userfavs(){
    var usermail = localStorage.getItem('useremail');

    const [favs, setFavs] = useState([]);
    function getfavlist(){
        Axios.post('http://localhost:30/getfavs',{
            UserName:usermail
        }).then(function(succ){
            setFavs(succ.data);
        })
    }

    useEffect(()=>{
        getfavlist();
    },[])



    function delfav(x){
        Axios.post('http://localhost:30/delfav',{
            id:x
        }).then(function(succ){
            getfavlist();
        })
    }
    
    



    return(
        <div>
            <Profile/>
            <div className="col-lg-9 col-lg-offset-3">
                <div className="col-lg-12 text-center">
                    <h2>Favourite Recipes</h2>
                </div>

                {favs.map((fav)=>(
                    <div key ={fav._id} className="col-lg-3 ">
                        <img src={fav.imgURL} className="img-responsive favrcpimg" />
                        <p className="favdishname">{fav.FavDish}</p>
                        <button onClick={()=>delfav(fav._id)} className="col-lg-12 btn btn-danger delfavs">Delete from favourites</button>
                        
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Userfavs;