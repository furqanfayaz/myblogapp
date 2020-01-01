import { Component } from "react";
import Link from 'next/link';
import { getList } from "../apis/BlogApis";
import { logout } from "../apis/Authapis";
import "../styles/styles.css";
import Cookie from "js-cookie";
import Router from "next/router";

class List extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
        }
    };

    componentDidMount = async () => {
        const res = await getList();
        if (res.data.success) {
            this.setState({ list: res.data.posts });
        }
    }
    handleLogout = async () => {
        const cookie = Cookie.get('token');
        const body = { cookie }
        const res  = await logout(body);
        try {
            if (res.data.success) {
                Cookie.remove('token');
                Router.push('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    render () {
        const { list } = this.state;
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <h1 style={{textAlign: 'center', flex: 2}}>Blogs</h1>
                    <Link href="/createblog">
                        <a style={{flex: 0.3, margin: 'auto'}}><h3>Add New Blog</h3></a>
                    </Link>
                    <button 
                        onClick={this.handleLogout}
                        className="btn"
                    >
                        Logout
                    </button>
                </div>
                
                <ol>
                {list.map((item) => {
                    return (
                            <li>
                                <Link as={`/blog/${item.id}`} href={`/blog?id=${item.id}`}>
                                    <a><h3>{item.title}</h3></a>
                                </Link>
                            </li>
                    )
                })}
                </ol>
            </div>
        )
    }
    

};
export default List;

