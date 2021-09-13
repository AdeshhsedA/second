import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import LoginNav from './loginnav';

function LoginRecipies(){
    const [recipe, setRecipe] = useState([]);



    function getrecipe(){
        Axios.get("http://localhost:30/getrecipe").then(function(succ){
            setRecipe(succ.data);
        })
    }


    function viewfullrecipe(x){
        localStorage.setItem('recpName',x);
        window.location.href="/rview"
    }

    

    useEffect(()=>{
        getrecipe();
    },[])







    
    return(
        <div>
            <LoginNav/>
            <div>

                <div className="text-center">

                        <h2>
                            Recipies
                        </h2>
                        <hr/>

                    
                </div>

               

                <div className="container  col-lg-12">
                    {recipe.map((rec)=>(
                        <div key = {rec._id} className="col-lg-4 ">
                            <div className='col-lg-12'>
                                <img src={rec.imgURL} className="img-responsive recpimg"/>
                                <button onClick={()=>{viewfullrecipe(rec.Name)}} className="ingbtn btn btn-deafult col-lg-12">View Full Recipe</button>
                            </div>
                            <div className="col-lg-12 rcpdetailbox">
                                <p className="recdet">Name: {rec.Name}</p>
                                <p className="recdet">Type: {rec.Type}</p>
                                <p className="recdet">Category: {rec.Category}</p>
                            </div>   

                            <div className="col-lg-12">
                                

                            </div>     
                            

                           
                            
                      
                            
                            
                            

                        
                            

                        </div>

                    ))}
                    <div>

                    </div>
                </div>


               
                

            </div>

        </div>
    )
}

export default LoginRecipies;