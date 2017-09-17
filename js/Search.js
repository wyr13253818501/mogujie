
import React from "react";

import "./../scss/search.scss"

import MyAjax from "./MyAjax.js"
import {hashHistory} from "react-router";


class Search extends React.Component{
    constructor(props){
        super(props);

        this.state={
            placeholder:"",
            proList : [],
            key:[]
        }



    }


    componentWillMount(){

        let that=this;
        let url="http://list.mogujie.com/module/mget?code=sketch%2ChotWord";
        MyAjax.fetchJsonp(url,function (data) {
            that.setState({
                placeholder:data.data.sketch.data.query,
                proList : data.data.hotWord.data
            })

        },function (err) {
            console.log(err)
        })
    }


    toHome(){
        hashHistory.push({pathname:"/",})
    }


    goSearchlist(){
        var id=this.refs.ipt.value;
        var that=this;
        if(id==""){

            id=this.state.placeholder;
        }else if(localStorage.getItem("key")){

            var arr=localStorage.getItem("key").split(",");

        }else{
            var arr=[];
        }




        if(arr.indexOf(id)=="-1"){
            arr.push(id)
        }

        localStorage.setItem("key",arr)

        hashHistory.push({
            pathname:"/searchlist",
            query:{
                id:id
            }
        })
    }



    toSearchlist(e){
        var id=e.target.innerHTML;
        var that=this;
        if(localStorage.getItem("key")){
            var arr=localStorage.getItem("key").split(",");
        }else{
            var arr=[];
        }
        if(arr.indexOf(id)=="-1"){
            arr.push(id)
        }

        localStorage.setItem("key",arr);
        hashHistory.push({
            pathname:"/searchlist",
            query:{
                id:id,
            }
        })
    }

    Delete(){
        localStorage.removeItem("key")
        this.setState({
            key:[],
        })
    }


    render() {
        let that=this;
        let data = this.state.proList;
        let arr4 = [];

        for (let i in data) {
            arr4.push(<li key={i} onClick={this.toSearchlist.bind(this)}>{data[i].query}</li>)
        }


        if(localStorage.getItem("key")){
            var arr1=localStorage.getItem("key")
            console.log(arr1);
            let arr2=[];
            for(let i in arr1){
                arr2.push( <li key={i} >{arr1[i]}</li>)
            }

            return (
                <div className="type">
                    <div className="mb">
                        <i className="iconfont" onClick = {this.toHome.bind(this)}>&#xe60d;</i>
                        <from className="mbForm">
                            <input type="search" placeholder={this.state.placeholder} ref="ipt" className="mbinput"/>

                            <a href="javascript:;" className="nma" onClick={this.goSearchlist.bind(this)}>搜索</a>
                        </from>
                    </div>

                    <div className="content">
                        <div className="lishi">
                            <div className="li-box1">
                                <p className="li-p1">历史搜索</p>
                                <p className="li-p2" onClick={this.Delete.bind(this)}>删除</p>
                            </div>
                            <div className="li-box2">
                                <ul className="ul-box">
                                    {arr2}
                                </ul>
                            </div>
                        </div>

                        <div className="re">
                            热门搜索
                            <ul id="proList">
                                {arr4}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }else{

            return (
                <div className="type">
                    <div className="mb">
                        <i className="iconfont" onClick = {this.toHome.bind(this)}>&#xe60d;</i>
                        <from className="mbForm">
                            <input type="search" placeholder={this.state.placeholder} ref="ipt" className="mbinput"/>

                            <a href="javascript:;" className="nma" onClick={this.goSearchlist.bind(this)}>搜索</a>
                        </from>
                    </div>

                    <div className="content">
                        <div className="lishi">
                            <div className="li-box1">
                                <p className="li-p1">历史搜索</p>
                                <p className="li-p2" onClick={this.Delete.bind(this)}>删除</p>
                            </div>
                            <div className="li-box2">
                                暂无搜索历史
                            </div>
                        </div>

                        <div className="re">
                            热门搜索
                            <ul id="proList">
                                {arr4}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default Search;

