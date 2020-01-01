import { Component } from "react";
import { addComment } from "../apis/BlogApis";
import Router from "next/router";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            post_id: '',
        }
    }

    componentDidMount = () => {
        this.setState({ post_id: this.props.postId });
    }
    
    handleClick = async () => {
        const { content, post_id } = this.state;
        const body = { content, post_id }
        const res = await addComment(body)
        try {
            if (res.data.success) {
                Router.push(`/blog?id=${post_id}`, `/blog/${post_id}`);
            }
        } catch (err) {
            console.log(err);
        }
        
    }

    render () {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <label for="comment">Comment</label> 
                    <input 
                        onChange={(e) => {this.setState({content: e.target.value})}} 
                        value={this.state.content} 
                        type="text" 
                        id="comment"
                    />
                    <button 
                        onClick={this.handleClick}
                    >
                        Post
                    </button>
                </div>
            </div>
        )
    }

};

export default Comment;