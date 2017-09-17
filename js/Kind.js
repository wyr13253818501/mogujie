
import React from "react";
import "./../scss/kind.scss";
import MyAjax from "./MyAjax.js"
import {hashHistory} from "react-router";

class Kind extends React.Component{
    constructor(props){
        super(props);
        this.state={
            placeholder:"",
            tabe1:"",
            tabe2:"",
            activeIndex:0,
            active:0,
            tabe3:"",
            tabe4:"",
            miniWallKey:"10062603"

        }
    }


    componentWillMount() {
        let that = this;

        let url1 = "http://list.mogujie.com/module/mget?code=sketch%2ChotWord";
        MyAjax.fetchJsonp(url1, function (data) {
            that.setState({
                placeholder: data.data.sketch.data.query

            })
        }, function (err) {
            console.log(err)
        });


        let url2 = "http://mce.mogucdn.com/jsonp/multiget/3?pids=41789%2C4604&callback";
        MyAjax.fetchJsonp(url2, function (data) {
            // console.log(data.data[41789].list);
            that.setState({
                tabe1:data.data[41789].list

            })
        }, function (err) {
            console.log(err)
        });

        let url3 = "http://mce.mogujie.com/jsonp/makeup/3?pid=41888";
        MyAjax.fetchJsonp(url3, function (data) {

            // console.log(data.data.categoryNavigation);
            that.setState({
                tabe2:data.data.categoryNavigation.list
            })
        }, function (err) {
            console.log(err)
        });

        let url4 = "https://list.mogujie.com/search?cKey=h5-cube&fcid=50003";
        MyAjax.fetchJsonp(url4, function (data) {
            // console.log(data.result.wall.docs);
            that.setState({
                tabe3:data.result.sortFilter,
                tabe4:data.result.wall.docs,
            })
        }, function (err) {
            console.log(err)
        });


    }



    toXiangqing(iid){
        hashHistory.push({pathname:"/xiangqing",
            query:{
                iid:iid
            }
        });
    }


    click(maitKey,i){
        let that=this;
        this.setState({
            activeIndex:i,

        })
        let url3 = "http://mce.mogujie.com/jsonp/makeup/3?pid="+maitKey;
        MyAjax.fetchJsonp(url3, function (data) {

            // console.log(data.data.categoryNavigation.list);
            that.setState({
                tabe2:data.data.categoryNavigation.list
            })
        }, function (err) {
            console.log(err)
        });

    }


    Aclick(sortKey,j){

        let that=this;
        let miniWallKey=this.state.miniWallKey
        console.log(sortKey);
        this.setState({
            active:j
        })
        let url4 = "https://list.mogujie.com/search?cKey=h5-cube&fcid="+miniWallKey+"&sort="+sortKey;
        MyAjax.fetchJsonp(url4, function (data) {
            // console.log(data.result.wall.docs);
            that.setState({
                tabe4:data.result.wall.docs,
            })
        }, function (err) {
            console.log(err)
        });
    }


        render(){
            let data1=this.state.tabe1;
            let arr1=[];
            for(let i in data1){
                // console.log(data1[i].maitKey,)
                arr1.push(<div className={this.state.activeIndex == i  ? "con-p active":"con-p"} ref="mack" key={i } onClick={this.click.bind(this,data1[i].maitKey,i )}>
                            <p>{data1[i ].title}</p>
                        </div>)
            }

            let data2=this.state.tabe2;
            let arr2=[];
            for(let i in data2){
                arr2.push(<div className="node" key={i}>
                                <div className="node-img">
                                    <img src={data2[i].image}/>
                                </div>
                                <p className="node-p">{data2[i].title}</p>
                            </div>)
            }



            let data3=this.state.tabe3;
            let arr3=[];
            for(let j in data3){
                arr3.push(<div className={this.state.active==j?"tab1 active":"tab1"} key={j} onClick={this.Aclick.bind(this,data3[j].sortKey,j)}>
                            <span className="tab-span">{data3[j].title}</span>
                          </div>)
            }

            let data4=this.state.tabe4;
            let arr4=[];
            for(let i in data4){
                arr4.push(<a className="jiazai" href="javascript:;" key={i} onClick={this.toXiangqing.bind(this,data4[i].iid)}>
                            <div className="box2-img">
                                <div className="bo">已售{data4[i].sale}件</div>
                                <img src={data4[i].img}/>
                            </div>
                            <div className="box2-xia">
                                <div className="name-box">
                                    <p className="goods_name">{data4[i].title}</p>
                                </div>
                                <div className="bot_box">
                                    <p className="p_price">￥{data4[i].price}</p>
                                    <p className="p_feed">{data4[i].cfav}<i className="iconfont" style={{fontStyle:"normal"}}>&#xe63b;</i></p>
                                </div>
                            </div>
                        </a>)
            }

            return (
                <div id="Kind">
                    <div className="banner">
                        <header className="header">
                            <div className="icon">
                                <i className="iconfont">&#xe611;</i>
                            </div>
                            <div className="searchBox">
                                <i className="iconfont">&#xe633;</i>
                                <input id="from" className="from" type="text" placeholder={this.state.placeholder}/>
                            </div>
                            <div className="tu">
                                <i className="iconfont">&#xe600;</i>
                            </div>
                        </header>
                    </div>

                    <div id="content">
                        <div className="con-left">
                            {arr1}
                        </div>
                        <div className="con-right">
                            <div className="black">
                                <div className="table1">
                                    {arr2}
                                    <div className="box1">
                                        <div className="tab">
                                            {arr3}
                                        </div>
                                        <div className="box2">
                                            {arr4}
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            )
    }
}

export default Kind;