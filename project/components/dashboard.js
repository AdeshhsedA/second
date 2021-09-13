import React, { useState , useEffect} from 'react';
import Axios from 'axios';
import LoginNav from './loginnav';

function Dashboard(){

  var token = localStorage.getItem('token');
  
  localStorage.setItem('onetoken', token);

    

  const [recipe, setRecipe] = useState([]);

  function getrecipe(){
      Axios.get('http://localhost:30/getrecipe').then(function(succ){
          setRecipe(succ.data);
      })
      
  }




  var recp1 = [];
    var recp2 = [];
    var recp3 = [];
    var recp4 = [];

    for(var i=0; i<recipe.length; i++){
        if(i == 0){
            recp1 = recipe[i];
        }else if(i == 3){
            recp2 = recipe[i];
        }else if(i == 2){
            recp3 = recipe[i];
        }else if(i == 4){
            recp4 = recipe[i];
        }
    }

  useEffect(()=>{
    getrecipe();
  },[])



    

  function viewfullrecipe(x){
    localStorage.setItem('recpName',x);
    window.location.href="/rview"
  }



  function setVisit(){
    var date = new Date();
    Axios.post('http://localhost:30/setvisits',{
        Date:date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
        Visits:1
    }).then(function(succ){

    })
}

useEffect(()=>{
    setVisit();
},[])

    return(
        
        <div>

            <LoginNav/>

            
            <div className="box0">
                <div className="stylebox col-lg-12">

                </div>

                <div className="col-lg-12">
                    <div className="Namebox col-lg-12">
                        <h1 className="mainheading">Flavour Chef</h1>
                        <p>Find everyday cooking inspiration on Flavour Chef. Discover recipes, cooks, videos, and how-tos based on the food you love and the friends you follow.</p>
                    </div>


                    

                </div>

                <div className="col-lg-12 text-center">
                    <h1 className="rcpdetails">Recipies</h1>
                </div>

                <div className="col-lg-12">
                    <div className="col-lg-3">
                        <div className="col-lg-12  text-center">
                            <img src={recp1.imgURL} onClick={()=>{viewfullrecipe(recp1.Name)}} className="img-responsive img" />
                            <p className="rcpname">{recp1.Name}</p>
                        </div>
                    </div>

                    <div className="col-lg-3 ">
                        <div className="col-lg-12  text-center">
                            <img src={recp2.imgURL} onClick={()=>{viewfullrecipe(recp2.Name)}} className="img-responsive img" />
                            <p className="rcpname">{recp2.Name}</p>
                        </div>

                    </div>

                    <div className="col-lg-3">
                        <div className="col-lg-12  text-center">
                            <img src={recp3.imgURL} onClick={()=>{viewfullrecipe(recp3.Name)}} className="img-responsive img" />
                            <p className="rcpname">{recp3.Name}</p>
                        </div>
                    </div>

                    <div className="col-lg-3 ">
                        <div className="col-lg-12  text-center">
                            <img src={recp4.imgURL} onClick={()=>{viewfullrecipe(recp4.Name)}} className="img-responsive img" />
                            <p className="rcpname">{recp4.Name}</p>
                        </div>

                    </div>
                </div>

                


                {/* <div className="col-lg-4  allrcpbox">
                    {recipe.map((rec)=>(
                        <div key ={rec._id} className="col-lg-12" >
                            <div className="col-lg-4">
                                <img src={rec.imgURL}  className="img-responsive"/>
                            </div> 

                            <div className="col-lg-8">
                                <p>{rec.Name}</p>
                                <p>{rec.Category}</p>
                                <p>{rec.Type}</p>
                            </div>
                            <div className="col-lg-12">
                                <hr />
                            </div>  
                            
                        </div>    
                    ))}
                    

                </div> */}

               
                
            </div>


        </div>
    )


}

export default Dashboard;