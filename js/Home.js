

import React from "react";

import {hashHistory} from "react-router";
import MyAjax from "./MyAjax.js"
import "./../scss/home.scss";
import fetch from "./Feach.js";



 class Home extends React.Component {
     constructor(props) {
         super(props);
         this.settime=true;
         this.swiper=true;
         this.time=null;
         this.state = {
             placeholder:"",
             Banner:[],
             img: "",
             Banner1:[],
             Time:"",
             h:"",
             m:"",
             s:"",
             wrap:"",
             six:"",
             like:""
         }
     }

     componentWillMount(){

         let that = this;

         let url = "http://list.mogujie.com/module/mget?code=sketch%2ChotWord";
         MyAjax.fetchJsonp(url, function (data) {
             that.setState({
                 placeholder: data.data.sketch.data.query

             })
         },function (err) {
             console.log(err)
         });


         let url1 = "http://mce.mogucdn.com/jsonp/multiget/3?pids=51822%2C51827%2C41119%2C51833%2C51836%2C4604&callback";
         MyAjax.fetchJsonp(url1, function (data) {
             that.setState({
                 Banner: data.data[51822].list,
                 img: data.data[51827].list,
                 Banner1: data.data[41119].list[0].list,
                 Time:data.data[41119].list[0],
                 wrap:data.data[51836].list,
                 six:data.data[51833].list,
             })


             let it=that.state.Time;
             let time1=it.time;
             if(that.settime&&time1>=0){
                 that.settime=false;
                 that.time=setInterval(function(){
                     time1=time1-1;
                     let h=parseInt(time1/3600);
                     h=h<10? '0'+h:h;
                     let m=parseInt((time1-h*3600)/60);
                     m=m<10? '0'+m:m;
                     let s=parseInt((time1-h*3600-m*60));
                     s=s<10? '0'+s:s;
                     that.setState({
                         h:h,
                         s:s,
                         m:m
                     })
                 },1000);
             }

         },function (err) {
             console.log(err)
          });

         let url2 = "https://list.mogujie.com/search?cKey=h5-shopping&fcid=&pid=9750&searchTag=&sort=pop&page=1&_version=61&_=1501075806494";
         fetch(url2, function (data) {
             // console.log(data.result.wall.docs)
             that.setState({
                cai:data.result.wall.docs
             })
         },function (err) {
             console.log(err)
         })


     }

     componentWillUnmount(){
         clearInterval(this.time)
     }

     toSearch() {
         hashHistory.push({pathname:"/search"});
     }

     toXiangqing(iid){
         hashHistory.push({pathname:"/xiangqing",
         query:{
            iid:iid
         }
         });
     }

     render() {
         let it=this.state.Time;


         let data1 = this.state.Banner;
         let arr1 = [];
         for (let i in data1) {
             arr1.push(<div key={i} className="swiper-slide"><img src={data1[i].image_800}/></div>)
         }

         let imag = this.state.img;
         let arr2 = [];
         for (let j in imag) {
             arr2.push(<div className="keys" key={j}>
                 <a href="javascript:;">
                     <div className="title">{imag[j].title}</div>
                     <div className="title1">{imag[j].description}</div>
                     <div className="img-box">
                         <img src={imag[j].image}/>
                     </div>
                 </a>
             </div>)
         }

         let imag1 = this.state.Banner1;
         let arr3 = [];
         for (let i in imag1) {
             arr3.push(<li key={i}>
                 <div className="key">
                     <img src={imag1[i].img}/>
                 </div>
                 <p className="p1">{imag1[i].title}</p>
                 <p className="p2">￥{imag1[i].salePrice}
                     <span className="orgin">
                                <del>￥{imag1[i].price}</del>
                            </span>
                 </p>
             </li>)
         }



         let gt=this.state.wrap;
         let arr5=[];
         for(let i in gt ){
             arr5.push(<div className="key-item" key={i}>
                          <a className="key-a" href="javascript:;">
                             <div className="img-wrap">
                                <img src={gt[i].image} />
                                <div className="imd-title">{gt[i].title}</div>
                             </div>
                          </a>
                       </div>)
              }

         let six1=this.state.six;
         let arr6=[];
         let arr7=[];
         for(let i in six1){
            if(i<3){
                let dt=six1[i].viceTitle.replace("{","").replace("}","");

                arr6.push(
                              <div key={i}>
                                <div>
                                    <p>{six1[i].title}</p>
                                    <p>{dt}</p>
                                </div>
                              <img src={six1[i].image}/>
                              </div>
                          )
               }else{
                    let dt=six1[i].viceTitle.replace("{","").replace("}","");
                    arr7.push(
                                <div key={i}>
                                    <div>
                                        <p>{six1[i].title}</p>
                                        <p>{dt}</p>
                                    </div>
                                    <img src={six1[i].image}/>
                                    </div>
                                )}
                       }

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
             <div className="type">
                 <header id="header">
                     <div className="icon">
                         <i className="iconfont">&#xe611;</i>
                     </div>

                     <div className="searchBox" onClick={this.toSearch.bind(this)}>
                         <i className="iconfont">&#xe633;</i>
                         <input id="from" className="from" type="text" placeholder={this.state.placeholder}/>

                     </div>

                     <div className="tu">
                         <i className="iconfont">&#xe600;</i>
                     </div>
                 </header>

                 <div id="content">
                     <div className="swiper-container" id="homeBanner">
                         <div className="swiper-wrapper" id="homeWrap">
                             {arr1}
                         </div>
                         <div className="swiper-pagination"></div>
                     </div>

                     <div id="box">
                         {arr2}
                     </div>

                     <div id="box1">

                         <div className="shang">
                             <div className="item">{it.title}</div>
                             <div className="item1">{it.viceTitle}</div>
                             <div className="san">
                                 <span>{this.state.h}</span>:<span>{this.state.m}</span>:<span>{this.state.s}</span>
                             </div>
                         </div>
                         <div className="swiper-container" id="swiper1">
                            <ul>
                             {arr3}
                            </ul>
                         </div>
                     </div>

                     <div id="box2">
                         <div className="tit">热门市场</div>
                         <div className="list">
                             {arr5}
                         </div>
                     </div>

                     <div id="box3">
                         <h2 className="biaoti">超实惠-促销直达</h2>
                         <div className="chao1">
                             {arr6}
                         </div>
                         <div className="chao2">
                             {arr7}
                         </div>

                     </div>
                     <div id="box4">
                     {arr8}
                     </div>
                 </div>

                 <div id="toast">
                 </div>
             </div>
         )
     }


     componentDidUpdate() {
         if(this.swiper&&this.state.Banner.length>0){
             this.swiper=false;
             let mySwiper = new Swiper('#homeBanner', {
                 pagination: " #homeBanner .swiper-pagination",
                 autoplay: 3000,
                 loop: true,
                 autoplayDisableOnInteraction: false,
                 paginationClickable: true,
             });
         }


     }

 }

export default Home;
