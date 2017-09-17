
import React from "react";
import "./../scss/register.scss";
import Toast from "./Toast.js"
import MyAjax from "./MyAjax.js";
import {hashHistory} from "react-router";

class Register extends React.Component{
    constructor(props){
        super(props);

    }

    toRegisterFn(){
        let that=this;
        let userID=this.refs.userId.value;
        let password=this.refs.password.value;
        // console.log(userID,password);
        if(userID==''||password==''){
          Toast.makeText("用户信息不完整" ,2000)
        }else{
            let userObj={
                url:'http://datainfo.duapp.com/shopdata/userinfo.php',
                dataType:"JSON",
                data:{
                    status:"register",
                    userID:userID,
                    password:password,
                }
            }
            that.refs.btn.innerHTML="注册中...";
            that.refs.btn.disabled="disabled" ;

            MyAjax.zeptoAjax(userObj,function (data) {
                that.refs.btn.innerHTML="注册";
                that.refs.btn.disabled="" ;
                if(data == "0"){
                    Toast.makeText("用户名重名",2000)
                }else if(data == "1"){
                    Toast.makeText("注册成功",2000);
                    hashHistory.push({pathname:"/my"})
                }else{
                    Toast.makeText("注册失败",2000);
                }
            })
        }

    }
    toMy(){
        hashHistory.push({pathname:"/my"})
    }

    render(){
        return (
            <div id="register">
                <div className="banner">
                    <header className="header">
                        <div className="icn" onClick={this.toMy.bind(this)}>
                            <i className="iconfont">&#xe601;</i>
                        </div>
                        <div className="head-title">
                           进入蘑菇街
                        </div>
                    </header>
                </div>

                <div id="content">
                    <div className="ipt-box">
                        <div className="ipt-box1">
                            <input type="text" className="userinput-input" id="userId" ref="userId" placeholder="输入用户名／邮箱／手机" />
                        </div>
                        <div className="ipt-box2">
                            <input type="password" placeholder="输入密码"  className="userinput-input" id="password" ref="password" />
                        </div>
                        <div className="ipt-box3">
                            <p className="ipt-p2" onClick={this.toRegisterFn.bind(this)} ref="btn">一键注册</p>

                        </div>
                    </div>
                </div>

                <div id="toast">
                </div>
            </div>

        )
    }
}

export default Register ;