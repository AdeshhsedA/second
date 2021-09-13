const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const mongo = require('mongodb');

const MongoClient = require('mongodb').MongoClient;

const cors = require('cors');

const connectionString = 'mongodb+srv://adesh:adesh2336@cluster0.ie3qh.mongodb.net/classproject?retryWrites=true&w=majority';


const client = new MongoClient(connectionString);

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());
app.use(cors());

var db;
var details;
var users;
var category ;
var ingredients;
var steps;
var comment;
var favourites;
var likes;
var views;
var visits;

MongoClient.connect(connectionString, {useUnifiedTopology:true}).then(client=>{
    console.log('connected to database');
    db = client.db('classproject');
    details = db.collection('recipies');
    users = db.collection('users');
    category = db.collection('category');
    ingredients = db.collection('ingredients');
    steps = db.collection('steps');
    comment = db.collection('comments');
    favourites = db.collection('favourites');
    likes = db.collection('likes');
    views = db.collection('views');
    visits = db.collection('visits');
})


app.post('/checkuser',(req,res)=>{
    users.findOne({
        Email:req.body.Email
    }).then(function(succ){
        if(succ == null){
            res.send('true');
        }else{
            res.send('false');
        }
    })
})





app.post('/insertuser',(req,res)=>{
    users.insertOne({
        Name:req.body.Name,
        Email:req.body.Email,
        Contact:req.body.Contact,
        Password:req.body.Password
    }).then(function(succ){
        res.send('true');
    }).catch(function(err){
        res.send('false');
    })
})

app.get('/getuser',(req,res)=>{
    users.find().toArray().then(function(succ){
        res.send(succ);
    })
})



app.get('/getcategory',(req,res)=>{
    category.find().toArray().then(function(succ){
        res.send(succ);
    })
})



app.get('/getrecipe',(req,res)=>{
    details.find().toArray().then(function(succ){
        res.send(succ);
    })
})


app.post('/getingredient',(req,res)=>{
    ingredients.findOne({
        DishName:req.body.dishname
    }).then(function(succ){
        if(succ != null){
            res.send(succ)
        }else{
            res.send('false');
        }
    })
})


app.post('/getsteps',(req,res)=>{
    steps.findOne({
        DishName:req.body.dishname
    }).then(function(succ){
        if(succ != null){
            res.send(succ);
        }else{
            res.send('false');
        }
    })
})


app.get('/viewsteps',(req,res)=>{
    steps.find().toArray().then(function(succ){
        res.send(succ);
    })
})


app.get('/viewingredients',(req,res)=>{
    ingredients.find().toArray().then(function(succ){
        res.send(succ);
    })
})


app.post('/userdetail',(req,res)=>{
    users.findOne({
        Email:req.body.Email
    }).then(function(succ){
        res.send(succ);
    })
})


app.post('/insertcomment',(req,res)=>{
    comment.insertOne({
        UserName:req.body.UserName,
        Recipe:req.body.RecipeName,
        Comment:req.body.Comment
    }).then(function(succ){
        if(succ != null){
            res.send('true');
        }else{
            res.send('false');
        }
    })
})


app.post('/insertfav',(req,res)=>{
    favourites.findOne({
        UserName:req.body.UserName,
        FavDish:req.body.FavDish
        
    }).then(function(succ){
        if(succ != null){
            res.send('false');
        }else{
            favourites.insertOne({
                UserName:req.body.UserName,
                FavDish:req.body.FavDish,
                imgURL:req.body.imgURL
            }).then(function(insrtd){
                res.send('true');
            })
        }
    })
})

app.post('/findfav',(req,res)=>{
    favourites.findOne({
        UserName:req.body.UserName,
        FavDish:req.body.FavDish
    }).then(function(succ){
        if(succ != null){
            res.send('true');
        }else{
            res.send('false');
        }
    })
})


app.post('/insertlike',(req,res)=>{
    likes.findOne({
        UserName:req.body.UserName,
        LikedDish:req.body.LikedDish
    }).then(function(succ){
        if(succ != null){
            res.send('false');
        }else{
            likes.insertOne({
                UserName:req.body.UserName,
                LikedDish:req.body.LikedDish
            }).then(function(insrtd){
                details.findOne({
                    Name:req.body.LikedDish
                }).then(function(dish){
                    if(dish != null){
                        var likes = dish.Likes+1;
                        details.updateOne({
                            Name:req.body.LikedDish
                        },{
                            $set:{
                                Likes:likes
                            }
                        }).then(function(inclikes){
                            console.log('updated');
                        })
                    }
                })
                res.send('true');
            })
        }
    })
})


app.post('/insertviewcount',(req,res)=>{
    views.findOne({
        RecipeName:req.body.RecipeName
    }).then(function(succ){
        if(succ != null){
            views.updateOne({
                RecipeName:req.body.RecipeName
            },{
                $set:{
                    Views:succ.Views+1
                }
            }).then(function(incview){
                views.findOne({
                    RecipeName:req.body.RecipeName
                }).then(function(founddata){
                    res.send(founddata);
                })
                
            })
        }else{
            views.insertOne({
                RecipeName:req.body.RecipeName,
                Views:parseInt(1)
            }).then(function(insrtview){
                views.findOne({
                    RecipeName:req.body.RecipeName
                }).then(function(rturninsrtdata){
                    res.send(rturninsrtdata);
                })
                
            })
        }
    })
})


app.post('/getfavs',(req,res)=>{
    favourites.find({
        UserName:req.body.UserName
    }).toArray().then(function(succ){
        res.send(succ);
    })
})

app.post('/getfavdish',(req,res)=>{
    details.findOne({
        Name:req.body.DishName
    }).then(function(succ){
        res.send(succ);
    })
})



app.post('/delfav',(req,res)=>{
    var favid = new mongo.ObjectId(req.body.id);
    favourites.deleteOne({
        _id:favid
    }).then(function(succ){
        res.send('true');
    })
})


app.post('/findcomments',(req,res)=>{
    comment.find({
        UserName:req.body.UserName
    }).toArray().then(function(succ){
        res.send(succ);
    })
})

app.post('/delcomment',(req,res)=>{
    var comid = new mongo.ObjectId(req.body.id);
    comment.deleteOne({
        _id:comid
    }).then(function(succ){
        res.send('true');
    })
})


app.post('/setvisits',(req,res)=>{
    var vis = 1;
    visits.findOne({
        Date:req.body.Date
    }).then(function(succ){
        if(succ != null){
            visits.updateOne({
                Date:req.body.Date
            },{
                $set:{
                    Visits:succ.Visits+1
                }
            }).then(function(updatesucc){
                res.send('true');
            })
        }else{
            visits.insertOne({
                Date:req.body.Date,
                Visits:vis
            }).then(function(insrtsucc){
                res.send('true');
            })
        }
    })
})


app.post('/getbycat',(req,res)=>{
    console.log(req.body.Category);
    details.find({
        Category:req.body.Category
    }).toArray().then(function(succ){
        console.log(succ);
        res.send(succ);
    })
})


app.listen(30,()=>{
    console.log('server started');
})