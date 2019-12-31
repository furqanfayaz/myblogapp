import { Component, createRef } from "react";
import { createPost } from "../apis/BlogApis";
import "../styles/styles.css";
import Router from "next/router";

class BlogForm extends Component {
    constructor() {
        super();
        this.inputRef = createRef();
        this.state = {
            title: '',
            content: '',
            file: '',
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
    handlecreateClick = async () => {
        const formData = new FormData();
        const { title, content, file } = this.state;
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', file);
        const res = await createPost(formData)
        try {
            if (res.data.success) {
                Router.push('/bloglist')
            }
        } catch (err) {
            console.log(err);
        }
    }

    render () {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
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
                        <button
                            onClick={this.handleClick}
                        >
                            Upload Image
                        </button> 
                    </div>         
                </div>
                <div style={{textAlign: 'center'}}>
                    <button 
                        onClick={this.handlecreateClick}
                        className="btn"
                    >
                        Submit
                    </button>
                </div>
            </div>
                
        )
    }

};
export default BlogForm;