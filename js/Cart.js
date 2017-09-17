
import React from "react";

import "./../scss/cart.scss";
import MyAjax from "./MyAjax.js"
import {hashHistory} from "react-router";
class Cart extends React.Component{
    constructor(props){
        super(props);
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


    goJie(){
        hashHistory.push({pathname:"/jiesuan"})
    }



    goHome(a){

        if(localStorage.getItem("islogin")=="1"){
            hashHistory.push({pathname:"/",})
        }else{
            hashHistory.push({
                pathname:"/my",
                query:{
                    cart:a
                }
            })
        }

    }

    Jia(id,index){
        let that=this;
        // console.log(id,index)

        // console.log($(".title-box .title-span").eq(index).find(".tian").html());

        let num=Number($(".title-box .title-span").eq(index).find(".tian").html())+1;

        let arr1=that.state.goods;
        // console.log(arr1)
        arr1[index].num=num;
        that.setState({
            num:arr1[index].num
        })

        $(".title-box .title-span").eq(index).find(".tian").html(num);
        let arr=JSON.parse(localStorage.getItem("goods"));
        for(let i in arr){
            if(id==arr[i].iid){
                arr[i].num++;
            }
        }
        localStorage.setItem("goods",JSON.stringify(arr));
        // console.log(localStorage.getItem("goods"))
        // history.go(0)
    }


    Jian(id,index){
        let that=this;
        // console.log(id,index)
        // console.log($(".title-box .title-span").eq(index).find(".tian").html());

        let num=Number($(".title-box .title-span").eq(index).find(".tian").html())-1;

        $(".title-box .title-span").eq(index).find(".tian").html(num);
        let arr=JSON.parse(localStorage.getItem("goods"));

        let arr1=that.state.goods;
        // console.log(arr1)
        arr1[index].num=num;
        that.setState({
            num:arr1[index].num
        })

        if(num == 0){
            for(let i in arr){
                if(id==arr[i].iid){
                    console.log(111);
                   $(".content-box").eq(index).css({display:"none"});
                   arr.splice(i,1)
                    localStorage.setItem("goods",JSON.stringify(arr));
                }
            }
        }

        for(let i in arr){
            if(id==arr[i].iid){
                arr[i].num--;
                // console.log(arr[i].num);
            }
        }
        localStorage.setItem("goods",JSON.stringify(arr));
        // console.log(localStorage.getItem("goods"))
    }



    Delete(id,index){
        // console.log(id,index);
        let arr=JSON.parse(localStorage.getItem("goods"));
        for(let i in arr){
            if(id==arr[i].iid){
                $(".content-box").eq(index).css({display:"none"});
                arr.splice(i,1)
                localStorage.setItem("goods",JSON.stringify(arr));
                if(arr.length==0){
                    this.setState({
                        goods:[]
                    })
                }
                localStorage.setItem("goods",JSON.stringify(arr));
                // console.log(localStorage.getItem("goods"))
            }
        }
    }

    // btn2(){
    //     let sum=0;
    //     let array1=[];
    //     // let array2=[];
    //     // let tmparr=[];
    //     let m=$(this).attr("data");
    //     let pid=$(this).attr("data-nm")
    //
    //
    //     if($(this).attr("checked")==undefined||$(this).attr("checked")==""){
    //         $(this).attr("checked","true");
    //         // ium++;
    //         $("#count").html(pid);
    //         sum=sum+Number(m);
    //         $("#full").html(sum.toFixed(2));
    //         let obj  = {pid:pid};
    //         console.log(obj);
    //         array1.push(obj);
    //
    //         let cookieStr = JSON.stringify(array1);
    //         localStorage.setItem('pid',cookieStr);
    //     }else{
    //         $(this).removeAttr("checked");
    //         sum=sum-Number(m);
    //         $("#full").html(sum.toFixed(2));
    //         $("#count").html(pid);
    //         let tmp=localStorage.getItem("pid");
    //         let tmparr=JSON.parse(tmp);
    //         for(let a in tmparr){
    //             if(tmparr[a].pid==pid){
    //                 tmparr.splice(a,1);
    //                 array1.splice(a,1);
    //                 let cookieStr = JSON.stringify(tmparr);
    //                 localStorage.setItem('pid',cookieStr);
    //
    //             }
    //         }
    //     }
    //
    // }




    render(){
        let that=this;
        let arr=this.state.goods;
        let arr2=[];
        let arr3=[];
        let money=0;
        let zhifu="";
        let nm=0;
        // let pm=0;
        let arr4=[];
        for(let i in arr){
           money=arr[i].nowPrice*arr[i].num;
           nm=arr[i].num;
           let id=arr[i].iid
            // pm+=nm;
            let mon=money.toFixed(2);
            zhifu=(Number(zhifu)+Number(mon)).toFixed(2);
            arr3.push(
                <div className="content-box" key={i}>
                    <div className="shop-title">
                        <input type="checkbox" className="shopcheckbox  btnnt" data-nm={nm}  data={money}/>
                        <div className="check-box">女神穿搭术</div>
                    </div>

                    <div className="big-box">
                        <div className="tox">
                            <input type="checkbox" className="shop-checkbox1" />
                            <div className="img-box">
                                <img src={arr[i].src[0]}/>
                            </div>
                            <div className="text-box">
                                <div className="title-box">
                                    <div className="title1">
                                        {arr[i].title}
                                    </div>
                                    <p  className="good-desc">颜色：图片色；尺码：均码；</p>
                                    <div className="title-span">
                                        <span className="cgood-price">￥{arr[i].nowPrice}</span>
                                        <span className="cgood-origin"><del>￥{arr[i].oldPrice}</del></span>
                                        <span className="cgood-count">x{nm}</span>

                                        <div className="ji">
                                            <span className="jian" onClick={this.Jian.bind(this,arr[i].id,arr[i].index)}>-</span>
                                            <span className="tian">{nm}</span>
                                            <span className="jia" onClick={this.Jia.bind(this,arr[i].id,arr[i].index)}>+</span>
                                            <span className="cgood" onClick={this.Delete.bind(this,arr[i].id,arr[i].index)}>删除</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="he">合计：<span className="right">￥{mon}</span></div>
                    </div>
                </div>)


        }


        if(arr.length == 0){

            arr2.push(
                <div className="c-box" key="1">
                    <div className="i-box" >
                        <i className="iconfont">&#xe600;</i>
                    </div>
                    <div className="d-box">购物车还是空的哦</div>
                    <div className="x-box">
                        <div className="e-box" onClick={this.goHome.bind(this,1)}>去逛逛</div>
                    </div>
                </div>)
        }else{
            arr2.push(<div className="bao" key={1}>
                {arr3}
                {/*<div className="dai">待支付：{zhifu}</div>*/}
                <div className="jie" onClick={this.goJie.bind(this)}>结算</div>
                <div className="menuleft">
                    <input   id="contr"   name="checkbox"   type="checkbox" style={{width:21+"px",height:21+"px"} } /> <span>全选</span><span id="count">(0)</span><span id="full">￥</span>
                </div>
            </div>)
        }



            if(arr.length==0){
                return(
                    <div id="cart">
                        <div className="banner">
                            <header className="header">
                                <div className="icn">
                                    <i className="iconfont">&#xe601;</i>
                                </div>
                                <div className="head-title">
                                    购物车
                                </div>
                                <div className="head-right">
                                    编辑
                                </div>
                            </header>
                        </div>
                        <div id="content">
                            {arr2}
                        </div>
                    </div>)
             }else{
                return(
                    <div id="cart">
                        <div className="banner">
                            <header className="header">
                                <div className="icn">
                                    <i className="iconfont">&#xe601;</i>
                                </div>
                                <div className="head-title">
                                    购物车({this.state.goods.length})
                                </div>
                                <div className="head-right">
                                    编辑
                                </div>
                            </header>
                        </div>
                        <div id="content">
                            {arr2}
                        </div>
                    </div>)
                }

    }

    // componentDidUpdate componentDidMount
    componentDidUpdate(){
            // let ium=0;
            let sum=0;
            let array1=[];
            let array2=[];
            let tmparr=[];

            $(".btnnt").on("click",function () {

                let m=$(this).attr("data");

                let pid=$(this).attr("data-nm");

                if($(this).attr("checked")==undefined||$(this).attr("checked")==""){
                    $(this).attr("checked","true");
                    // ium++;
                    $("#count").html(pid);
                    sum=sum+Number(m);
                    $("#full").html(sum.toFixed(2));
                    let obj  = {pid:pid};
                    console.log(obj);
                    array1.push(obj);

                    let cookieStr = JSON.stringify(array1);
                    localStorage.setItem('pid',cookieStr);
                }else{
                    $(this).removeAttr("checked");
                    sum=sum-Number(m);
                    $("#full").html(sum.toFixed(2));
                    $("#count").html(pid);
                    let tmp=localStorage.getItem("pid");
                    let tmparr=JSON.parse(tmp);
                    for(let a in tmparr){
                        if(tmparr[a].pid==pid){
                            tmparr.splice(a,1);
                            array1.splice(a,1);
                            let cookieStr = JSON.stringify(tmparr);
                            localStorage.setItem('pid',cookieStr);

                        }
                    }
                }
            })

        }



    }

export default Cart;



