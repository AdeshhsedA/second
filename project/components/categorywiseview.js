import React, {useState, useEffect } from 'react';
import Axios from 'axios';
import Nav from './nav';
import LoginNav from './loginnav';

function CatView(){

    var cattoken = localStorage.getItem('setcategory');
    const [catvalue, setCatValue] = useState([]);

    function getbycat(){

        Axios.post('http://localhost:30/getbycat',{
            Category:cattoken
        }).then(function(succ){
            setCatValue(succ.data);
        })
    }

    useEffect(()=>{
        getbycat();
    },[])

    

    return(
        <div>
            <Nav/>
            <div className="col-lg-12">
                <div className="col-lg-12 text-center">
                    <h1>Results for "{cattoken}"</h1>
                    <hr/>

                </div>
                {catvalue.map((cat)=>(
                    <div className="col-lg-3">
                        <img src={cat.imgURL} className="img-responsive img img-thumbnail"/>
                        <p className="rcpname text-center">{cat.Name}</p>
                    </div>
                ))}



            </div>
            

        </div>
    )
}

export default CatView;