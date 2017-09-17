

import React from "react";
import {Link, IndexLink} from "react-router";
import "./../scss/xiangqing.scss";
import MyAjax from "./MyAjax.js"
import Toast from "./Toast.js"
import {hashHistory} from "react-router";

class Xiangqing extends React.Component{
    constructor(props){
        super(props);

        this.state={
            iid : this.props.location.query.iid,
            banner:"",
            table1:"",
            table2:"",
            table3:"",
            table4:"",
            table5:"",
            table6:"",
            table7:"",
            table8:"",
            table9:"",
            table10:"",
            show:false,
        }

    }


    componentWillMount(){
        let that=this;
        let url="http://m.mogujie.com/jsonp/detail.api/v1?iid="+ this.state.iid +"&template=1-2-detail_normal-1.0.0&appPlat="
        MyAjax.fetchJsonp(url,function (data) {
            // console.log(data.data);
            that.setState({
                banner:data.data.topImages,
                table1:data.data.itemInfo.seo.keywords,
                table2:data.data.normalPrice.currency,
                table3:data.data.normalPrice.nowPrice,
                table4:data.data.normalPrice.oldPrice,
                table5:data.data.normalPrice.priceTags[0].text,
                table6:data.data.itemServices.columns[0].desc,
                table7:data.data.itemServices.columns[1].desc,
                table8:data.data.itemServices.services[0].name,
                table9:data.data.itemServices.services[1].name,
                table10:data.data.itemServices.services[2].name,
            })

        },function (err) {
            console.log(err)
        })
    }


    Ashow(){
        let show = this.state.show;
        if(!show){
            this.refs.chu.style.display = "block";
            this.refs.chu1.style.display = "block";
            this.setState({
                show : true
            })
        }else{
            this.refs.chu.style.display = "none";
            this.refs.chu1.style.display = "none";
            this.setState({
                show : false
            })
        }
    }
    chu1(){
        this.refs.chu.style.display = "none";
        this.refs.chu1.style.display = "none";
        this.setState({
            show : false
        })
    }



    Addcart(){
        if(localStorage.getItem("islogin")=="1"){

            Toast.makeText("加入购物车成功",3000)
            let that=this;
            let iid=this.refs.cart.getAttribute("data-iid");
            // console.log(iid)
            let open=true;
            if(localStorage.getItem("goods")){
                var arr=JSON.parse(localStorage.getItem("goods"));

                for(var i in arr){
                    if(arr[i].iid==iid){
                        arr[i].num++;
                        open=false;
                    }

                }
                localStorage.setItem("goods",JSON.stringify(arr))
                if(open){
                    var obj={
                        iid:iid,
                        num:1,
                    };
                    arr.push(obj);
                    localStorage.setItem("goods",JSON.stringify(arr))
                }

            }else{
                let arr=[];
                let obj={
                    iid:iid,
                    num:1,
                };
                arr.push(obj);
                localStorage.setItem("goods",JSON.stringify(arr))
            }


        }else{

            // console.log(111)
            Toast.makeText("请先登录",3000)
            hashHistory.push({pathname:"/my"})

        }

    }



    render(){

        let data1 = this.state.banner;
        let arr1 = [];
        for (let i in data1) {
            arr1.push(<div key={i} className="swiper-slide"><img src={data1[i]}/></div>)
        }


        return (
            <div id="Detail">
                <div id="content">
                    <div className="banner">
                        <div className="swiper-container"  id = "banner_swiper">
                            <div className="swiper-wrapper">
                                {arr1}
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                        <div className = "title">
                            <span  className="title-text">{this.state.table1}</span>
                        </div>

                        <div className="tox1">
                            <div className="tox2">
                                <div className="tab1">
                                    <sapn className="abs1">{this.state.table2}</sapn>
                                    <span className="abs2">{this.state.table3}</span>
                                </div>
                                <div className="tab2">
                                    <span className="abs3">{this.state.table4}<del></del></span>
                                    <span className="abs4">{this.state.table5}</span>
                                </div>
                            </div>
                        </div>

                        <div className="tox2">
                            <div className="tox3">
                                <div className="tox3-1">
                                    <span className="abs5">{this.state.table6}</span>
                                    <span className="abs6">{this.state.table7}</span>
                                </div>
                                <div className="tox3-2">
                                    <div className="tab3">
                                        <span className="abs7">
                                            <div className="img-box">
                                                <img src="http://s3.mogucdn.com/p1/170215/idid_ie4tonztmjqtcobrmuzdambqgqyde_60x60.png_60x60.webp" />
                                            </div>
                                        </span>
                                        <span className="abs8">{this.state.table8}</span>
                                    </div>
                                    <div className="tab3">
                                        <span className="abs7">
                                            <div className="img-box">
                                                <img src="http://s3.mogucdn.com/p1/170215/idid_ie4tonztmjqtcobrmuzdambqgqyde_60x60.png_60x60.webp" />
                                            </div>
                                        </span>
                                        <span className="abs8">{this.state.table9}</span>
                                    </div>
                                    <div className="tab3">
                                        <span className="abs7">
                                            <div className="img-box">
                                                <img src="http://s3.mogucdn.com/p1/170215/idid_ie4tonztmjqtcobrmuzdambqgqyde_60x60.png_60x60.webp" />
                                            </div>
                                        </span>
                                        <span className="abs8">{this.state.table10}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="menu" ref="chu">
                        <ul >
                            <li>
                                <IndexLink to = "/" activeClassName="active">
                                    <p className="p1">首页</p>
                                    <i className="iconfont">&#xe684;</i>
                                </IndexLink>
                            </li>
                            <li>
                                <Link to = "/cart" activeClassName="active">
                                    <p className="p1">购物车</p><i className="iconfont">&#xe600;</i></Link>
                            </li>
                            <li>
                                <Link to = "/kind" activeClassName="active">
                                    <p className="p1">搜索</p><i className="iconfont">&#xe7f9;</i>
                                    </Link>
                            </li>
                            <li>
                                <Link to = "/my" activeClassName="active">
                                    <p className="p1">查看订单</p><i className="iconfont">&#xe641;</i></Link>
                            </li>
                        </ul>
                    </div>

                    <div className="yuan" onClick={this.Ashow.bind(this)}>
                        <p className="kuai">快捷<br />导航</p>
                    </div>


                </div>





                <div id="Detail-foot">
                    <div className = "footer_left">
                        <div>
                            <span className = "iconfont">&#xe6ac;</span>
                            客服
                        </div>
                        <div className = "">
                            <span className = "iconfont">&#xe63b;</span>
                            收藏
                        </div>
                        <div className = "">
                            <span className = "iconfont">&#xe601;</span>
                            小店
                        </div>
                    </div>
                    <div className = "footer_right">
                        <div className = "footer_right_1" ref="cart"
                             onClick={this.Addcart.bind(this)}
                             data-iid={this.props.location.query.iid}>
                            加入购物车
                        </div>
                        <div className = "footer_right_2">
                            立即购买
                        </div>
                    </div>
                </div>

                <div className="zhezhao" ref="chu1" onClick={this.chu1.bind(this)}></div>
                <div id="toast">
                </div>
            </div>
        )

    }

    componentDidUpdate() {
        var mySwiper = new Swiper('#banner_swiper', {
            pagination: " #banner_swiper .swiper-pagination",
            loop: true,
            paginationType: 'fraction',
            observer:true,
        });
    }
}

export default Xiangqing ;

