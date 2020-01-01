import { Component } from "react";
import { getBlog } from "../apis/BlogApis";
import { deleteBlog } from "../apis/BlogApis";
import { deleteComment } from "../apis/BlogApis"
import "../styles/styles.css";
import Link from "next/link";
import Router from "next/router";

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
            const res = await getBlog(blogId);
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

    handleUpdateBlog = async (id) => {
        Router.push(`/updateblog?id=${id}`, `/updateblog/${id}`);
    }

    handleDeleteBlog = async (id) => {
        const res = await deleteBlog(id);
        try {
            if (res.data.success) {
                Router.push("/bloglist");
            }
        } catch (err) {
            console.log(err);
        }
    }

    handleDeleteComment = async (id) => {
        const res = await deleteComment(id);
        try {
            if (res.data.success) {
                this.setState({
                    comments: this.state.comments.filter((comment) => {
                        return comment.id !== id;
                    })
                })
            }
        }  catch (err) {
            console.log(err);
        }
    }

    render () {
        const { id, title, img_url, content, comments } = this.state;

        return (
                <div style={{display: 'flex', flexDirection: 'column', padding: '16px 16px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Link href="/bloglist">
                                <a><h3> Back to blog list</h3></a>
                            </Link>
                        </div>
                        <div>
                            <button
                                onClick={() => {this.handleUpdateBlog(id)}}
                                className="btn"
                            >
                                Update Blog
                            </button>
                            <button
                                onClick={() => {this.handleDeleteBlog(id)}}
                                className="btn"
                            >
                                Delete Blog
                            </button>  
                        </div>
                        
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <h1>
                            {title}
                        </h1>
                    </div>
                    <div>
                        <div style={{ 
                                    backgroundImage: `url(${img_url})`, 
                                    margin: 'auto',
                                    height: '300px',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    width: '500px' }} />
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
                                                onClick={() => {this.handleDeleteComment(item.id)}}
                                                className="btn"
                                            >
                                                Remove
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