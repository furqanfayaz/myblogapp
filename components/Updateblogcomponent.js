import { Component, createRef } from "react";
import { updateBlog } from "../apis/BlogApis";
import { getBlog } from "../apis/BlogApis";
import "../styles/styles.css";
import Router from "next/router";

class Editblog extends Component {
    constructor(props) {
        super(props);
        this.inputRef = createRef();
        this.state = {
            title: '',
            content: '',
            file: '',
            img_url: '',
        }
    }
    
    componentDidMount = async () => {
        const { blogId } = this.props;
        console.log(blogId)
        try {
            const res = await getBlog(blogId);
            if (res.data.success) {
                this.setState({
                    id: res.data.posts[0].id,
                    title: res.data.posts[0].title,
                    content: res.data.posts[0].content, 
                    img_url: res.data.posts[0].media,
                    });
            }

        } catch (err) {
            console.log(err);
        }
    }
    handleClick = () => {
        if(this.inputRef && this.inputRef.current) {
            this.inputRef.current.click();
        }
    }

    onChangeFile = (e) => {
        this.setState({loading: true});
        const files = e.target.files;
        this.setState({file: files[0]});
    }
    handleupdateClick = async () => {
        const formData = new FormData();
        const { id, title, content, file } = this.state;
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', file);
        const res = await updateBlog(id, formData)
        try {
            if (res.data.success) {
                Router.push(`/blog?id=${res.data.post.id}`, `/blog/${res.data.post.id}`)
            }
        } catch (err) {
            console.log(err);
        }
    }

    render () {
        const { title, content, img_url } = this.state;
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div style={{margin: 'auto'}}>
                        <label for="title">Title:</label> 
                        <input 
                            onChange={(e) => {this.setState({title: e.target.value})}} 
                            value={this.state.title} 
                            type="text" 
                            id="title"
                        />
                    </div>
                    <div style={{margin: 'auto'}}>
                        <label for="content">Content:</label>    
                        <input
                            onChange={(e) => {this.setState({content: e.target.value})}} 
                            value={this.state.content} 
                            type="text" 
                            id="content"
                        />
                    </div>
                    <div style={{margin: 'auto'}}>
                        <input
                                onChange={this.onChangeFile} 
                                ref={this.inputRef} 
                                type="file" 
                                style={{display: 'none'}} 
                        />
                        <div>
                            <div style={{ backgroundImage: `url(${img_url})`, margin: 'auto' }} />
                            <button
                                onClick={this.handleClick}
                            >
                                Change Image
                            </button>
                        </div>
                    </div>         
                </div>
                <div style={{textAlign: 'center'}}>
                    <button 
                        onClick={this.handleupdateClick}
                        className="btn"
                    >
                        Update
                    </button>
                </div>
            </div>
                
        )
    }

};
export default Editblog;