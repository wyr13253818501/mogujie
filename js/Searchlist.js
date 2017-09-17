import React from "react";

import MyAjax from "./MyAjax.js";

import "./../scss/searchlist.scss";

import {hashHistory} from "react-router";


export default class Searchlist extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.location.query.id,
            cai:"",
        }
    }

    componentWillMount(){
        let that=this;
        // let id = location.href.split("id=")[1];
        let url="http://list.mogujie.com/search?_version=61&ratio=3%3A4&q="+this.state.id+"&cKey=46";
        MyAjax.fetchJsonp(url,function(data){

            console.log(data.result.wall.docs);
            that.setState({
                cai:data.result.wall.docs
            })
        },function(err){
            console.log(err)
        })

    }

    toSearch(){
        hashHistory.push({
            pathname:"/search"
        })
    }

    toXiangqing(iid){
        hashHistory.push({pathname:"/xiangqing",
            query:{
                iid:iid
            }
        });
    }

    render(){

        let cai1=this.state.cai;
        let arr8=[];
        for(let i in cai1){
            let arr9=[];
            let cai2=cai1[i].props
            for(let j in cai2){
                arr9.push(<span className="tag" key={j}>{cai2[j]}</span>)
            }
            // console.log(cai1[i])
            arr8.push(
                <a href="javascipt:;" className="box5" key={i}>
                    <div className="goods" onClick={this.toXiangqing.bind(this,cai1[i].iid)}>
                        <img src={cai1[i].img}/>
                    </div>
                    <div className="name">
                        {arr9}
                    </div>
                    <div className="bot">
                        <p className="price1">￥{cai1[i].price}</p>
                        <p className="price2">{cai1[i].cfav} <i className="iconfont" style={{fontStyle:"normal"}}>&#xe63b;</i></p>
                    </div>
                </a> )

        }



        return (
            <div id = "searchlist">
                <div className="mb">
                    <i className="iconfont" onClick={this.toSearch.bind(this)}>&#xe60d;</i>
                    <from className="mbForm">
                        <input type="search" placeholder={this.state.id} ref="ipt" className="mbinput"/>
                    </from>
                </div>
                <div id="content">
                    <div id="box4">
                        {arr8}
                        {/*<a href="javascipt:;" className="box5" >*/}
                            {/*<div className="goods" >*/}
                                {/*<img src=""/>*/}
                            {/*</div>*/}
                            {/*<div className="name">*/}

                            {/*</div>*/}
                            {/*<div className="bot">*/}
                                {/*<p className="price1">￥</p>*/}
                                {/*<p className="price2"> <i className="iconfont" style={{fontStyle:"normal"}}>&#xe63b;</i></p>*/}
                            {/*</div>*/}
                        {/*</a>*/}
                    </div>
                </div>
            </div>
        )
    }
}
