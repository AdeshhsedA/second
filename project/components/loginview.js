import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import LoginNav from './loginnav';

function RView(){

    var recpName = localStorage.getItem('recpName');
    var username = localStorage.getItem('useremail');



    const [dish, setDish] = useState([]);
    const [ingredient, setIngredient] = useState([]);
    const [steps, setSteps] = useState([]);


    function getrecipe(){
        Axios.get("http://localhost:30/getrecipe").then(function(succ){
            setDish(succ.data);
        })
    }

    function getsteps(){
        Axios.get('http://localhost:30/viewsteps').then(function(succ){
            setSteps(succ.data);
        })
    }


    function getingredients(){
        Axios.get('http://localhost:30/viewingredients').then(function(succ){
            setIngredient(succ.data);
        })
    }


    useEffect(()=>{
        getrecipe();
    },[])

    useEffect(()=>{
        getingredients();
    },[])

    useEffect(()=>{
        getsteps();
    },[])


    var currentdish = [];
    var currentIngre = [];
    var currentsteps = [];

    for(var i=0; i<dish.length; i++){
        if(dish[i].Name == recpName){
            currentdish = dish[i];
        }
    }

    for(var i=0; i<ingredient.length; i++){
        if(ingredient[i].DishName == recpName){
            currentIngre = ingredient[i];

        }
    }

    for(var i=0; i<steps.length; i++){
        if(steps[i].DishName == recpName){
            currentsteps = steps[i];
        }
    }



    /* Comment Section */
    const [comment, setComment] = useState('');

    function submitcomment(){
        if(comment == ''){
            alert('comment cannot be empty');
        }else{
            Axios.post('http://localhost:30/insertcomment',{
            UserName:username,
            RecipeName:recpName,
            Comment:comment
        }).then(function(succ){
            if(succ.data = true){
                alert('Inserted Successfully');
                resetcomment();
            }else{
                alert('something went wrong');
            }
        })

        }
        
    }

    function test(){
        alert(comment);
    }

    function resetcomment(){
        setComment('');
    }

    function favdish(){
        Axios.post('http://localhost:30/findfav',{
            UserName:username,
            FavDish:recpName
        }).then(function(succ){
            if(succ.data == true){
                document.getElementById('favbtn').style.color = 'red';
            }else{
                document.getElementById('favbtn').style.color = 'white';
            }
        })
    }


    useEffect(()=>{
        favdish();
    },[])

    function addtofav(x){
        Axios.post('http://localhost:30/insertfav',{
            UserName:username,
            FavDish:recpName,
            imgURL:x
        }).then(function(succ){
            if(succ.data == true){
                document.getElementById('favbtn').style.color = 'red';
                alert('added to favorites');
            }else{
                alert('Already Added to Favourites');
            }
        })
    }


    /*like setup */
    function like(){
        Axios.post('http://localhost:30/insertlike',{
            UserName:username,
            LikedDish:recpName

        }).then(function(succ){
            if(succ.data == true){
                alert('liked');
                getrecipe();
                document.getElementById('likebtn').style.color = 'blue';
            }else{
                document.getElementById('likebtn').style.color = "blue";
                alert('Already Liked');
            }
        })
    }

    /* views setup*/
    const [views, setViews] = useState([]);

    function viewcount(){
        Axios.post('http://localhost:30/insertviewcount',{
            RecipeName:recpName
        }).then(function(succ){
            setViews(succ.data);
        })
    }

    useEffect(()=>{
        viewcount();
    },[])



    return(
        <div>
            <LoginNav/>

            <div className="col-lg-12 "> 
                <div className = " col-lg-12 text-center ">
                    <h2 className="rcpdetails">{currentdish.Name}</h2>
                    
                </div>

                <div className="col-lg-2">
                    <div className="col-lg-6 viewbox">
                        <i className="glyphicon glyphicon-eye-open eyeicon"></i>
                    </div>
                    <div className="col-lg-6  viewbox">
                        <p>{views.Views}</p>
                    </div>
                    <div className="col-lg-6 col-lg-offset-3 likebox">
                        <button onClick={like} id="likebtn" className="glyphicon glyphicon-thumbs-up likebtn "></button>
                        
                    </div>

                    <div className="likes col-lg-1">
                        <p >{currentdish.Likes}</p>

                    </div>
                    <div className="col-lg-6 col-lg-offset-3">
                        <button onClick={()=>{addtofav(currentdish.imgURL)}} id="favbtn" className="glyphicon glyphicon-heart favbtn"></button>

                    </div>
                    
                    

                </div>

                
                <div className="col-lg-4 ">
                    <img src={currentdish.imgURL} className="img-responsive viewimg" />
                </div>

                <div className="col-lg-4">
                    <h4 className="">Name : {currentdish.Name}</h4>
                    <h4 className="">Category : {currentdish.Category}</h4>
                    <h4 className="">Type: {currentdish.Type}</h4>
                    <h4 className="">Desciption : {currentdish.Description}</h4>
                    
                </div>

                <div className="col-lg-5">
                    <h3 className="rcpdetails">Required Ingredients:</h3>
                    <p>
                        {currentIngre.Ingredients}
                    </p>

                </div>
                <div className = "col-lg-8 col-lg-offset-2">
                    <h3 className="rcpdetails">Steps:</h3>
                    <p>
                        {currentsteps.Steps}
                    </p>
                </div>

                
            </div>

            <div className="col-lg-12 cmntbox">
                <div className="form-group col-lg-5 col-lg-offset-2">
                    <label>Comment:</label>
                    <textarea  className="form-control" onChange={(event)=>{setComment(event.target.value)}} value={comment} placeholder="Write Your Feedback Here"></textarea>
                </div>

                <div className="form-group col-lg-5 col-lg-offset-2" >
                    <button onClick={submitcomment} className="btn btn-primary col-lg-4">Submit</button>
                    <button onClick={resetcomment} className="btn btn-danger col-lg-4 col-lg-offset-1">Reset</button>
                </div>

            </div>
            
        </div>
    )
}


export default RView;