

import React from "react";

import "./../scss/jie.scss";
import {hashHistory} from "react-router";
import MyAjax from "./MyAjax.js"
export default class Jiesuan extends React.Component{
    constructor(props){
        super(props)
        this.state={
            goods:[],

        }
    }

    componentWillMount(){
        let  that=this;
        let  arr=[];
        if(localStorage.getItem("goods")){
            let it=JSON.parse(localStorage.getItem("goods"));
            // console.log(it);
            this.setState({
                goods:arr,

            });

            let id=0;
            for(let  i in it){
                let gt=it[i].iid;

                let url="http://m.mogujie.com/jsonp/detail.api/v1?iid="+gt+"&template=1-2-detail_normal-1.0.0&appPlat=";
                // let goods=[1];
                MyAjax.fetchJsonp(url, function (data) {
                    let obj1=data.data;
                    // console.log(obj1)
                    let godobj={
                        src:obj1.topImages,
                        title:obj1.itemInfo.seo.keywords,
                        nowPrice:obj1.normalPrice.nowPrice,
                        oldPrice:obj1.normalPrice.oldPrice,
                        num:it[i].num,
                        id:it[i].iid,
                        index:id,
                    };
                    id++;
                    let arr=that.state.goods;
                    arr.push(godobj);
                    that.setState({
                        goods:arr

                    })

                },function (err) {
                    console.log(err)
                });
            }
        }else{
            let goods=[];
            this.setState({
                goods:arr
            })
        }

    }


    Chu(){

        let that=this;
        this.refs.show2.style.display="block";
        this.refs.show1.style.display="block";
    }

    Xiao(){
        let that=this;
        this.refs.show2.style.display="none";
        this.refs.show1.style.display="none";
    }

    goCart(){
        hashHistory.push({pathname:"/cart"})
    }


    render(){
        let that=this;
        let data1=this.state.goods;
        // console.log(data1)
        console.log(data1)
        let arr1=[];
        let money=0;
        let zhifu="";
        let nm=0;
        let pm=0;
        for(let i in data1){
            money=data1[i].nowPrice*data1[i].num;
            nm=data1[i].num
            pm+=nm;
            let mon=money.toFixed(2);
            zhifu=(Number(zhifu)+Number(mon)).toFixed(2);

            arr1.push(<div className="content-box" key={i}>
                        <div className="box-img">
                            <div className="ab">
                                <div className="ab-box">
                                    <div className="ab-left">
                                        <img src={data1[i].src[0]} />
                                    </div>
                                    <div className="ab-center">
                                        <div className="center-shang">
                                            <p  className="skuItem-desc--title">{data1[i].title}</p>
                                        </div>
                                        <div className="center-xia">
                                            <p  className="skuDesc-desc">颜色：白色网纱+黑色背心+黑色假两件长裤；尺码：S码：建议100斤以内；</p>
                                        </div>
                                    </div>
                                    <div className="ab-right">
                                        <span  className="skuItem-price--old"><del>¥{data1[i].oldPrice}</del></span>
                                        <span  className="skuItem-price--now">¥{data1[i].nowPrice}</span>
                                        <span  className="skuItem-num--origininput">x{data1[i].num}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="saleber">
                            <span  className="salebar-title">店铺合计：</span>
                            <span  className="salebar-price">¥{money}</span>
                        </div>
                   </div>)
        }

        if(data1.length==0){
            return(
                <div id="jie">
                    <div className="banner">
                        <header className="header">
                            <div className="icn" onClick={this.goCart.bind(this)}>
                                <i className="iconfont">&#xe601;</i>
                            </div>
                            <div className="head-title">
                                确认订单
                            </div>
                            <div className="head-right">
                                <i className="iconfont">&#xe600;</i>
                            </div>
                        </header>
                    </div>
                </div>
            )

        }else{
            return (
                <div id="jie">
                    <div className="banner">
                        <header className="header">
                            <div className="icn" onClick={this.goCart.bind(this)}>
                                <i className="iconfont">&#xe601;</i>
                            </div>
                            <div className="head-title">
                                确认订单
                            </div>
                            <div className="head-right">
                                <i className="iconfont">&#xe600;</i>
                            </div>
                        </header>
                    </div>
                    <div id="content">
                        <div className="tianxie" onClick={this.Chu.bind(this)}>
                            请先填写收货地址
                        </div>
                        {arr1}
                        <div className="footer">
                            <div className="jige">共{pm}件产品</div>
                            <div className="zhojia">总价：{zhifu}￥</div>
                        </div>
                    </div>


                    <div className="shou" ref="show2">
                        <div className="s-box1">
                            请填写收货地址
                        </div>
                        <div className="cha" onClick={this.Xiao.bind(this)}>x</div>
                        <div className="brick-box1">
                            <input type="text" placeholder="姓名" className="ipt1"/>
                            <input type="text" placeholder="手机号" className="ipt2"/>
                        </div>
                        <div className="brick-box2">
                            <div className="a-box">
                                <select className="addresss">
                                    <option  value="">请选择省份</option>
                                    <option  value="101570">河南省</option>
                                </select>
                            </div>
                            <div className="a-box">
                                <select className="addresss">
                                    <option  value="">请选择省份</option>
                                    <option  value="101570">河南省</option>
                                </select>
                            </div>
                            <div className="a-box">
                                <select className="addresss">
                                    <option  value="">请选择省份</option>
                                    <option  value="101570">河南省</option>
                                </select>
                            </div>
                        </div>
                        <div className="brick-box3">
                            <textarea className="t-data" placeholder="详细街道地址"></textarea>
                        </div>
                        <div className="brick-box4">保存</div>
                    </div>
                    <div className="zhezhao" ref="show1"></div>
                </div>)
        }


    }
}
