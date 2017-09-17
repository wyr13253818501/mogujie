
import React from "react";
import "./../scss/my.scss";
import {hashHistory} from "react-router";
import Toast from "./Toast.js"
import MyAjax from "./MyAjax.js"

class My extends React.Component{
    constructor(props){
        super(props);
        this.focus=false;
    }

    Zhu(){
        localStorage.setItem("islogin",0);
        hashHistory.push({pathname:"/"})
    }


    toLoginFn(){
        hashHistory.push({pathname:"/register"})
    }
    Back(){
        hashHistory.push({pathname:"/"})
    }

    Deng(){
        var that=this;
        var userID=this.refs.userId.value;
        var password=this.refs.password.value;
        // console.log(userID,password);

        if (userID == '' || password == '') {
            Toast.makeText("用户信息不完整", 2000);
        }else{
            that.refs.btn.innerHTML="登录中...";
            that.refs.btn.disabled="disabled" ;
            
            let url="http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID="+userID+"&password="+password;
            MyAjax.fetch(url,function (data) {
                that.refs.btn.innerHTML="登录";
                that.refs.btn.disabled="" ;

                if(data=='0'){
                    Toast.makeText("用户名不存在", 3000);

                    that.refs.userId.value="";
                    that.refs.password.value="";
                    that.refs.userId.focus=true;

                }else if(data=='2'){
                    Toast.makeText("用户名不符", 3000);
                    that.refs.userId.value="";
                    that.refs.password.value="";
                    that.refs.userId.focus();
                    that.refs.userId.focus=true;
                }else{
                    Toast.makeText("登录成功", 3000);
                    console.log(that.props.location.query.cart);

                    if(that.props.location.query.cart==1){
                        hashHistory.push({pathname:"/cart"})
                    }else{
                        hashHistory.push({pathname:"/"})
                    }

                    localStorage.setItem("islogin","1")
                    localStorage.setItem("userID",userID);
                }
            })
        }
    }


    render(){
        if(localStorage.getItem("islogin")=="1"){
            return(
                <div id="My">
                    <div className="my-box">
                        <div className="h-box">
                            欢迎
                        </div>
                        <button onClick={this.Zhu.bind(this)} className="bttn">注销</button>
                    </div>
                </div>)
        }else{
            return (
                <div id="My">
                    <div className="banner">
                        <header className="header">
                            <div className="icn" onClick={this.Back.bind(this)}>
                                <i className="iconfont">&#xe601;</i>
                            </div>
                            <div className="head-title">
                                登录
                            </div>
                            <div className="head-right">
                                忘记密码
                            </div>
                        </header>
                    </div>
                    <div id="content">
                        <div id="content-box">
                            <div className="ipt-box">
                                <p  className="userinput-title">蘑菇街账号</p>
                                <input type="text" placeholder="输入用户名／邮箱／手机"  className="userinput-input" ref="userId"/>
                            </div>

                            <div className="ipt-box1">
                                <p  className="userinput-title">密码</p>
                                <input type="password" placeholder="输入密码"  className="userinput-input"  id="password" ref="password"  />
                            </div>

                            <div className="confirm_button" onClick={this.Deng.bind(this)} ref="btn" id="btn">
                                登录
                            </div>

                            <div className="ipt-box2">
                                <p className="ipt-p1">免密登录</p>
                                <p className="ipt-p2" onClick={this.toLoginFn.bind(this)}>注册账号</p>
                            </div>
                        </div>
                    </div>
                    <div id="toast">
                    </div>
                </div>)
        }

    }
}

export default My;



