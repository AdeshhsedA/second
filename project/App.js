import React from 'react';
import Home from './components/home';
import Register from './components/register';
import Dashboard from './components/dashboard';
import Userlog from './components/userlogin';
import LoginRecipies from './components/loginrecipies';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Recipies from './components/recipies';
import View from './components/view';
import RView from './components/loginview';
import Userdetails from './components/userdetails';
import Userfavs from './components/userfavs';
import Mycomments from './components/mycomments';
import CatView from './components/categorywiseview';
import LogCatView from './components/logincategorywiseview';





function App() {
  return (
   <div>
     <Router>
       <Route path = "/" exact component = {Home}/>
       <Route path = "/register" component = {Register}/>

       <Route path = "/userlogin" component = {Userlog}/>
       <Route path = "/dashboard" component = {Dashboard}/>
       <Route path = "/recipies" component = {Recipies} />
       <Route path = '/loginrecipies' component = {LoginRecipies}/>
       <Route path = '/view' component = {View} />
       <Route path ='/rview' component = {RView} />
       <Route path = '/userdetails' component = {Userdetails} />
       <Route path = '/userfavs' component = {Userfavs} />
       <Route path = '/mycomments' component = {Mycomments} />
       <Route path = '/categorywiseview' component = {CatView} />
       <Route path = '/logcatview' component = {LogCatView} />


       
     </Router>
   </div>
  );


}

export default App;
