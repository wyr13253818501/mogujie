

import React from "react";
import ReactDOM from "react-dom";

import {Route,Router,Link,hashHistory,IndexRoute} from "react-router";

import App from "./js/App.js";
import "./scss/main.scss";

import Home from "./js/Home.js";
import Kind from "./js/Kind.js";
import Cart from "./js/Cart.js";
import My from "./js/My.js";

import Search from "./js/Search.js";
import Xiangqing from "./js/Xiangqing.js";

import Jiesuan from "./js/Jiesuan.js";

import Register from "./js/Register.js";

import Searchlist from "./js/Searchlist.js"

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component = {App}>
            <IndexRoute components={{type:Home}} />
            <Route path="/kind" components={{type:Kind}} />
            <Route path="/cart" components={{type:Cart}} />
            <Route path="/my" components={{type:My}} />
        </Route>

        <Route	path = "/search" component = {Search}></Route>

        <Route	path = "/xiangqing" component = {Xiangqing}></Route>

        <Route	path = "/register" component = {Register}></Route>

        <Route	path = "/jiesuan" component = {Jiesuan}></Route>

        <Route	path = "/searchlist" component = {Searchlist}></Route>
    </Router>
),document.getElementById("app"));