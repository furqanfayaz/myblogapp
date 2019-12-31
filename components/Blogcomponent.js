import { Component } from "react";
import { getblog } from "../apis/BlogApis";
import { deleteComment } from "../apis/BlogApis"
import "../styles/styles.css";
import Link from "next/link";

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            content: '',
            img_url: '',
            comments: [],
        };
    };
    
    componentDidMount = async () => {
        const { blogId } = this.props;
        try {
            const res = await getblog(blogId);
            if (res.data.success) {
                this.setState({
                    id: res.data.posts[0].id,
                    title: res.data.posts[0].title,
                    content: res.data.posts[0].content, 
                    img_url: res.data.posts[0].media,
                    comments: res.data.posts[0].comments,
                    });
            }

        } catch (err) {
            console.log(err);
        }
    }

    handleDelete = async (id) => {
        console.log(id)
        const res = await deleteComment(id);
        try {
            if (res.data.success) {
                Router.push("/blog");
            }
        }  catch (err) {
            console.log(err);
        }
    }

    render () {
        const { title, img_url, content, comments } = this.state;

        return (
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{textAlign: 'center'}}>
                        <h1>
                            {title}
                        </h1>
                    </div>
                    <div>
                        <div style={{ backgroundImage: `url(${img_url})`, margin: 'auto' }} />
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <p>
                            {content}
                        </p>
                    </div>
                    <div>
                        <div style={{display: 'flex'}}> 
                            <h4 style={{flex: 1}}> Comments </h4>
                            <Link as={`/comment/${this.state.id}`} href={`/comment?id=${this.state.id}`}>
                                    <a>Add Comment</a>
                            </Link>
                        </div>
                        
                        <ul>
                            {comments.map((item) => {
                                return (
                                    <li>
                                        <div style={{display: 'flex'}}>
                                            <p style={{flex: 2}}>{item.content}</p>
                                            <button 
                                                onClick={this.handleDelete(item.id)}
                                                className="btn"
                                            >
                                                Remove Comment
                                            </button>
                                        </div>
                                        
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
        )
    }
    

};
export default Blog;