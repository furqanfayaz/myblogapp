import { Component } from "react";
import Link from 'next/link';
import { getList } from "../apis/BlogApis";

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

    render () {
        const { list } = this.state;
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <h1 style={{textAlign: 'center', flex: 2}}>Blogs</h1>
                    <Link href="/createblog">
                        <a style={{flex: 0.2}}>Add New Blog</a>
                    </Link>
                </div>
                
                <ol>
                {list.map((item) => {
                    return (
                            <li>
                                <Link as={`/blog/${item.id}`} href={`/blog?id=${item.id}`}>
                                    <a>{item.title}</a>
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

