
import React from "react";
import {Link, IndexLink} from "react-router";

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="container">
                {this.props.type}
                <footer id="footer" ref="footer">
                    <ul>
                        <li>
                            <IndexLink to = "/" activeClassName="active">
                                <i className="iconfont">&#xe684;</i>首页
                            </IndexLink>
                        </li>

                        <li>
                            <Link to = "/kind" activeClassName="active">
                                <i className="iconfont">&#xe7f9;</i>
                                分类</Link>
                        </li>
                        <li>
                            <Link to = "/cart" activeClassName="active">
                                <i className="iconfont">&#xe600;</i>购物车</Link>
                        </li>
                        <li>
                            <Link to = "/my" activeClassName="active">
                                <i className="iconfont">&#xe641;</i>我的</Link>
                        </li>
                    </ul>
                </footer>
            </div>
        )
    }

}